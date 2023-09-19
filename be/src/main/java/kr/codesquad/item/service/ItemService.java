package kr.codesquad.item.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.category.repository.CategoryRepository;
import kr.codesquad.chat.repository.ChatRoomRepository;
import kr.codesquad.favorite.repository.FavoriteRepository;
import kr.codesquad.image.entity.Image;
import kr.codesquad.image.repository.ImageRepository;
import kr.codesquad.image.service.AmazonS3Service;
import kr.codesquad.item.dto.ItemMapper;
import kr.codesquad.item.dto.request.ItemSaveRequest;
import kr.codesquad.item.dto.request.ItemStatusDto;
import kr.codesquad.item.dto.request.ItemUpdateRequest;
import kr.codesquad.item.dto.response.ItemCountDataResponse;
import kr.codesquad.item.dto.response.ItemDetailResponse;
import kr.codesquad.item.dto.response.ItemImageResponse;
import kr.codesquad.item.dto.response.ItemListResponse;
import kr.codesquad.item.dto.response.ItemStatusResponse;
import kr.codesquad.item.dto.response.ItemUpdateResponse;
import kr.codesquad.item.dto.response.UserItemListResponse;
import kr.codesquad.item.dto.slice.ItemListSlice;
import kr.codesquad.item.dto.slice.UserItemListSlice;
import kr.codesquad.item.dto.vo.ItemListVo;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.entity.ItemConditions;
import kr.codesquad.item.repository.ItemPaginationRepository;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.ItemStatus;
import kr.codesquad.util.S3ImageDirectory;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;
	private final ImageRepository imageRepository;
	private final CategoryRepository categoryRepository;
	private final FavoriteRepository favoriteRepository;
	private final LocationRepository locationRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ItemPaginationRepository itemPaginationRepository;
	private final AmazonS3Service amazonS3Service;

	@Transactional
	public Long saveItem(List<MultipartFile> imageFiles, ItemSaveRequest itemRequest, String userLoginId) {
		// 로그인한 유저 아이디
		Long userId = userRepository.findIdByLoginId(userLoginId);

		String locationName = locationRepository.findLocationNameById(itemRequest.getMyLocationId());
		String thumbnailUrl = "https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/profileImage/%EC%BD%94%EB%81%BC%EB%A6%AC.png";
		Item item = itemRepository.save(Item.builder()
			.title(itemRequest.getTitle())
			.content(itemRequest.getContent())
			.price(itemRequest.getPrice())
			.locationId(itemRequest.getMyLocationId())
			.locationName(locationName)
			.categoryId(itemRequest.getCategoryId())
			.thumbnailUrl(thumbnailUrl)
			.userId(userId)
			.status(ItemStatus.판매중)
			.build());
		if (imageFiles.size() != 0) {
			String url = amazonS3Service.upload(imageFiles.get(0), S3ImageDirectory.ITEM_IMAGE);
			imageRepository.save(Image.builder()
				.url(url)
				.itemId(item.getId())
				.build());
			thumbnailUrl = url;
			for (int i = 1; i < imageFiles.size(); i++) {
				imageRepository.save(Image.builder()
					.url(amazonS3Service.upload(imageFiles.get(i), S3ImageDirectory.ITEM_IMAGE))
					.itemId(item.getId())
					.build());
			}
			item.setThumbnailUrl(thumbnailUrl);
		}
		return item.getId();
	}

	@Transactional(readOnly = true)
	public ItemDetailResponse getItem(Long id, String userLoginId) {
		Long userId = userRepository.findIdByLoginId(userLoginId);
		Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
		User seller = userRepository.findById(item.getUserId())
			.orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

		List<ItemImageResponse> images = imageRepository.findByItemId(item.getId());
		String categoryName = categoryRepository.findNameById(item.getCategoryId());
		int chatCount = chatRoomRepository.countByItemId(item.getId());
		int favoriteCount = favoriteRepository.countByItemId(item.getId());

		return ItemDetailResponse.builder()
			.isSeller(seller.getId().equals(userId))
			.images(images)
			.seller(seller.getNickname())
			.status(ItemStatusResponse.of(item.getStatus()))
			.title(item.getTitle())
			.categoryName(categoryName)
			.createdAt(item.getCreatedAt())
			.content(item.getContent())
			.countData(item.countData(chatCount, favoriteCount))
			.isFavorite(favoriteRepository.existsByUserIdAndItemId(userId, item.getId()))
			.price(item.getPrice())
			.build();
	}

	@Transactional
	public void updateItem(Long id, List<MultipartFile> newImageFiles, List<Long> deleteImageIds,
		ItemUpdateRequest request, String userLoginId) {
		Long userId = userRepository.findIdByLoginId(userLoginId);

		List<ItemImageResponse> images = imageRepository.findByItemId(id);

		String thumbnailUrl = images.get(0).getUrl();

		// 이미지 삭제
		if (deleteImageIds != null && !deleteImageIds.isEmpty()) {
			for (int i = 0; i < images.size(); i++) {
				if (deleteImageIds.contains(images.get(i).getId())) {
					//amazonS3Service.delete(images.get(i).getUrl());
					images.remove(i);
					i--;
				}
			}
			if (!images.isEmpty()) {
				thumbnailUrl = images.get(0).getUrl();
			}
			// 이미지 테이블에서 삭제
			imageRepository.deleteAllByIdIn(deleteImageIds);
		}

		// 이미지 추가
		if (newImageFiles != null && !newImageFiles.isEmpty()) {
			for (MultipartFile newImageFile : newImageFiles) {
				String url = amazonS3Service.upload(newImageFile, S3ImageDirectory.ITEM_IMAGE);
				imageRepository.save(Image.builder()
					.url(url)
					.itemId(id)
					.build());
			}
		} else {
			if (images.isEmpty()) {
				thumbnailUrl = "https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/profileImage/%EC%BD%94%EB%81%BC%EB%A6%AC.png";
			}
		}

		Item targetItem = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
		if (!targetItem.getUserId().equals(userId)) {
			throw new IllegalArgumentException("해당 아이템을 수정할 수 없습니다.");
		}

		if (targetItem.getLocationId() != request.getMyLocationId()) {
			String locationName = locationRepository.findLocationNameById(request.getMyLocationId());
			targetItem.update(request, locationName, thumbnailUrl);
		} else {
			targetItem.update(request, targetItem.getLocationName(), thumbnailUrl);
		}
	}

	@Transactional
	public void deleteItem(Long id, String userLoginId) {
		//		if (!itemRepository.existsByIdAndUserLoginId(id, userLoginId)) {
		//			throw new IllegalArgumentException("해당 아이템을 삭제할 수 없습니다.");
		//		}
		itemRepository.deleteById(id);
	}

	// 보류 기능
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

	public ItemListSlice readAll(Long itemId, Long categoryId, int pageSize,
		String loginId) {
		String categoryName = null;
		if (categoryId != null) {
			categoryName = categoryRepository.findNameById(categoryId);
		}
		User user = userRepository.findByLoginId(loginId);
		String locationName = locationRepository.findByUserId(user.getId()).getLocationName();

		List<ItemListVo> itemListVos = itemPaginationRepository.readByConditions(ItemConditions.builder()
			.itemId(itemId)
			.locationName(locationName)
			.categoryId(categoryId)
			.pageSize(pageSize)
			.build());

		Long nextCursor = setNextCursor(itemListVos, pageSize);
		List<ItemListVo> itemListVosResized = resizeList(pageSize, itemListVos);

		List<ItemListResponse> items = itemListVosResized.stream()
			.map(itemListVo -> ItemMapper.INSTANCE.toItemListResponse(itemListVo,
				ItemCountDataResponse.builder()
					.chat(itemListVo.getChat().intValue())
					.favorite(itemListVo.getFavorite().intValue())
					.build(),
				itemListVo.getStatus().name(), user.getId().equals(itemListVo.getUserId())))
			.collect(Collectors.toList());

		return ItemListSlice.builder()
			.items(items)
			.categoryName(categoryName)
			.userLocation(locationName)
			.nextCursor(nextCursor)
			.build();
	}

	private Long setNextCursor(List<ItemListVo> content, Integer pageSize) {
		Long nextCursor = null;
		if (!content.isEmpty() && content.size() > pageSize) {
			nextCursor = content.get(content.size() - 1).getId();
		}
		return nextCursor;
	}

	public UserItemListSlice getUserItems(Long itemId, Boolean isSold, int size, String loginId) {
		User user = userRepository.findByLoginId(loginId);

		List<ItemListVo> itemListVos = itemPaginationRepository.readByConditions(ItemConditions.builder()
			.isSold(isSold)
			.pageSize(size)
			.userId(user.getId())
			.itemId(itemId)
			.build());

		return createUserItemListSlice(itemListVos, size);
	}

	public UserItemListSlice getFavoriteItems(Long itemId, Long categoryId, int size, String loginId) {
		User user = userRepository.findByLoginId(loginId);

		List<ItemListVo> itemListVos = itemPaginationRepository.readByConditions(ItemConditions.builder()
			.categoryId(categoryId)
			.pageSize(size)
			.userId(user.getId())
			.isFavorite(true)
			.itemId(itemId)
			.build());

		return createUserItemListSlice(itemListVos, size);
	}

	private UserItemListSlice createUserItemListSlice(List<ItemListVo> itemListVos, Integer pageSize) {
		Long nextCursor = setNextCursor(itemListVos, pageSize);
		List<ItemListVo> itemListVosResized = resizeList(pageSize, itemListVos);
		List<UserItemListResponse> items = itemListVosResized.stream()
			.map(itemListVo -> ItemMapper.INSTANCE.toUserItemListResponse(itemListVo,
				ItemCountDataResponse.builder()
					.chat(itemListVo.getChat().intValue())
					.favorite(itemListVo.getFavorite().intValue())
					.build(),
				itemListVo.getStatus().name()))
			.collect(Collectors.toList());

		return UserItemListSlice.builder()
			.items(items)
			.nextCursor(nextCursor)
			.build();
	}

	private List<ItemListVo> resizeList(Integer pageSize, List<ItemListVo> itemListVos) {
		if (itemListVos.size() > pageSize) {
			return itemListVos.subList(0, pageSize);
		}
		return itemListVos;
	}

	@Transactional
	public ItemStatusDto updateItemStatus(Long id, ItemStatusDto itemStatusDto, String userLoginId) {
		Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
		User user = userRepository.findByLoginId(userLoginId);
		if (!item.getUserId().equals(user.getId())) {
			throw new IllegalArgumentException("해당 아이템의 소유자가 아닙니다.");
		}

		String statusName = item.updateStatus(itemStatusDto.getStatusName());
		return new ItemStatusDto(statusName);
	}
}
