package kr.codesquad.item.service;

import kr.codesquad.item.dto.ItemRequest;
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

    @Transactional
    public void saveItem(List<MultipartFile> imageFiles, ItemRequest.SaveInDto itemRequest, User user) {
        // 로그인한 유저 아이디
        Long userId = 1L;

        // 이미지 처리하고 썸네일 하나 받아옴
        String thumbnailUrl = "썸네일 url 이지롱";

        itemRepository.save(Item.builder()
                .title(itemRequest.getTitle())
                .content(itemRequest.getContent())
                .price(itemRequest.getPrice())
                .locationName(itemRequest.getLocationName())
                .categoryId(itemRequest.getCategoryId())
                .thumbnailUrl(thumbnailUrl)
                .userId(userId)
                .status(ItemStatus.판매중)
                .build());
    }

    @Transactional(readOnly = true)
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public Item getItem(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이템이 없습니다."));
    }

    @Transactional
    public void updateItem(Long id, List<MultipartFile> newImageFiles, List<Long> delteImageIds, ItemRequest.UpdateInDto item) {
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
}
