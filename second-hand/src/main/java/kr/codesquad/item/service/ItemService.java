package kr.codesquad.item.service;

import kr.codesquad.category.CategoryRepository;
import kr.codesquad.chat.ChatRepository;
import kr.codesquad.favorite.FavoriteRepository;
import kr.codesquad.image.ImageRepository;
import kr.codesquad.item.dto.ItemRequest;
import kr.codesquad.item.dto.ItemResponse;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.item.entity.Item;
import kr.codesquad.user.User;
import kr.codesquad.util.ItemStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final FavoriteRepository favoriteRepository;
    private final ChatRepository chatRepository;

    @Transactional
    public Long saveItem(List<MultipartFile> imageFiles, ItemRequest.SaveInDto itemRequest, User user) {
        // 로그인한 유저 아이디
        Long userId = 1L;

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
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public ItemResponse.DetailOutDto getItem(Long id) {
        // 로그인한 유저 정보 -> 상세 보기는 무조건 있기 때문에 null 처리 안 함
        User userPS = User.builder()
            .id(1L)
            .login_id("임시로그인아이디1")
            .build();

        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));

        List<ItemResponse.imageInfo> images = imageRepository.findByItemId(item.getId());
        String categoryName = categoryRepository.findNameById(item.getCategoryId());
        int chatCount = chatRepository.countByItemId(item.getId());
        int favoriteCount = favoriteRepository.countByItemId(item.getId());

        return ItemResponse.DetailOutDto.builder()
            .isSeller(userPS.getId().equals(item.getUserId()))
            .images(images)
            .seller(userPS.getLogin_id())
            .status(ItemResponse.DetailOutDto.StatusDropdown.of(item.getStatus()))
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
    public void updateItem(Long id, List<MultipartFile> newImageFiles, List<Long> deleteImageIds, ItemRequest.UpdateInDto item) {
        // 수정 권한 등 확인

        // 이미지 삭제
        // 새로운 이미지 처리
        String thumbnailUrl = null;
        // 썸네일 삭제되면 썸네일 새로 정함
        // if ~ thumbnailUrl = ~

        Item targetItem = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
        targetItem.update(item, thumbnailUrl);
    }

    @Transactional
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    public ItemResponse.UpdateOutDto getItemForUpdate(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));

        // 추후 작은 사이즈로 변경
        List<ItemResponse.imageInfo> images = imageRepository.findByItemId(item.getId());

        return ItemResponse.UpdateOutDto.builder()
            .images(images)
            .title(item.getTitle())
            .categoryId(item.getCategoryId())
            .content(item.getContent())
            .price(item.getPrice())
            .locationName(item.getLocationName())
            .build();
    }
}
