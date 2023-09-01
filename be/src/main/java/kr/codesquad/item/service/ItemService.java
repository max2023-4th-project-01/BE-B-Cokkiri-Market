package kr.codesquad.item.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.category.repository.CategoryRepository;
import kr.codesquad.chat.repository.ChatRepository;
import kr.codesquad.favorite.repository.FavoriteRepository;
import kr.codesquad.image.repository.ImageRepository;
import kr.codesquad.item.dto.CustomSlice;
import kr.codesquad.item.dto.ItemListVo;
import kr.codesquad.item.dto.ItemMapper;
import kr.codesquad.item.dto.request.ItemSaveRequest;
import kr.codesquad.item.dto.request.ItemUpdateRequest;
import kr.codesquad.item.dto.response.ItemCountDataResponse;
import kr.codesquad.item.dto.response.ItemDetailResponse;
import kr.codesquad.item.dto.response.ItemImageResponse;
import kr.codesquad.item.dto.response.ItemListResponse;
import kr.codesquad.item.dto.response.ItemStatusResponse;
import kr.codesquad.item.dto.response.ItemUpdateResponse;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.repository.ItemPaginationRepository;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.ItemStatus;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;
	private final ImageRepository imageRepository;
	private final CategoryRepository categoryRepository;
	private final FavoriteRepository favoriteRepository;
	private final LocationRepository locationRepository;
	private final ChatRepository chatRepository;
	private final ItemPaginationRepository itemPaginationRepository;
	private final UserRepository userRepository;

	@Transactional
	public Long saveItem(List<MultipartFile> imageFiles, ItemSaveRequest itemRequest, String userLoginId) {
		// 로그인한 유저 아이디
		Long userId = userRepository.findIdByLoginId(userLoginId);

		// 이미지 처리하고 썸네일 하나 받아옴
		String thumbnailUrl = "썸네일 url 이지롱";

		return itemRepository.save(Item.builder()
			.title(itemRequest.getTitle())
			.content(itemRequest.getContent())
			.price(itemRequest.getPrice())
			.locationName(itemRequest.getLocationName())
			.categoryId(itemRequest.getCategoryId())
			.thumbnailUrl(thumbnailUrl)
			.userId(userId)
			.status(ItemStatus.판매중)
			.build()).getId();
	}

	@Transactional(readOnly = true)
	public ItemDetailResponse getItem(Long id) {
		// 로그인한 유저 정보 -> 상세 보기는 무조건 있기 때문에 null 처리 안 함
		User userPS = User.builder()
			.id(1L)
			.nickName("임시닉네임1")
			.build();

		Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));

		List<ItemImageResponse> images = imageRepository.findByItemId(item.getId());
		String categoryName = categoryRepository.findNameById(item.getCategoryId());
		int chatCount = chatRepository.countByItemId(item.getId());
		int favoriteCount = favoriteRepository.countByItemId(item.getId());

		return ItemDetailResponse.builder()
			.isSeller(userPS.getId().equals(item.getUserId()))
			.images(images)
			.seller(userPS.getNickName())
			.status(ItemStatusResponse.of(item.getStatus()))
			.title(item.getTitle())
			.categoryName(categoryName)
			.createdAt(item.getCreatedAt())
			.content(item.getContent())
			.countData(item.countData(chatCount, favoriteCount))
			.isFavorite(favoriteRepository.existsByUserIdAndItemId(userPS.getId(), item.getId()))
			.price(item.getPrice())
			.build();
	}

	@Transactional
	public void updateItem(Long id, List<MultipartFile> newImageFiles, List<Long> deleteImageIds,
		ItemUpdateRequest item, String userLoginId) {
		// 수정 권한 등 확인
		if (!itemRepository.existsByIdAndUserLoginId(id, userLoginId)) {
			throw new IllegalArgumentException("해당 아이템을 수정할 수 없습니다.");
		}
		// 이미지 삭제
		// 새로운 이미지 처리
		String thumbnailUrl = null;
		// 썸네일 삭제되면 썸네일 새로 정함
		// if ~ thumbnailUrl = ~

		Item targetItem = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
		targetItem.update(item, thumbnailUrl);
	}

	@Transactional
	public void deleteItem(Long id, String userLoginId) {
		if (!itemRepository.existsByIdAndUserLoginId(id, userLoginId)) {
			throw new IllegalArgumentException("해당 아이템을 삭제할 수 없습니다.");
		}
		itemRepository.deleteById(id);
	}

	public ItemUpdateResponse getItemForUpdate(Long id) {
		Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));

		// 추후 작은 사이즈로 변경
		List<ItemImageResponse> images = imageRepository.findByItemId(item.getId());

		return ItemUpdateResponse.builder()
			.images(images)
			.title(item.getTitle())
			.categoryId(item.getCategoryId())
			.content(item.getContent())
			.price(item.getPrice())
			.locationName(item.getLocationName())
			.build();
	}

	public CustomSlice<ItemListResponse> readAll(Long itemId, Long categoryId, int pageSize,
		String loginId) {
		String categoryName = null;
		if (categoryId != null) {
			categoryName = categoryRepository.findNameById(categoryId);
		}
		User user = userRepository.findByLoginId(loginId);
		String locationName = locationRepository.findByUserId(user.getId()).getLocationName();

		Slice<ItemListVo> response = itemPaginationRepository.findByIdAndLocationName(itemId,
			locationName,
			categoryId, pageSize);
		List<ItemListVo> itemListVos = response.getContent();
		List<ItemListResponse> items = itemListVos.stream()
			.map(itemListVo -> ItemMapper.INSTANCE.toItemListResponse(itemListVo,
				ItemCountDataResponse.builder()
					.chat(itemListVo.getChat().intValue())
					.favorite(itemListVo.getFavorite().intValue())
					.build(),
				ItemStatus.판매중.name(), loginId.equals(itemListVo.getLoginId())))
			.collect(Collectors.toList());

		Long nextCursor = setNextCursor(items);

		return CustomSlice.<ItemListResponse>builder()
			.items(items)
			.categoryName(categoryName)
			.userLocation(locationName)
			.hasNext(response.hasNext())
			.nextCursor(nextCursor)
			.build();
	}

	private Long setNextCursor(List<ItemListResponse> content) {
		Long nextCursor = null;
		if (!content.isEmpty()) {
			nextCursor = content.get(content.size() - 1).getId();
		}
		return nextCursor;
	}
}
