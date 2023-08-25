package kr.codesquad.item.controller;

import kr.codesquad.item.dto.ItemRequest;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.service.ItemService;
import kr.codesquad.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/items")
    public ResponseEntity<Void> createItem(@RequestPart List<MultipartFile> imageFiles,
                                     @RequestPart ItemRequest.SaveInDto items) {
        // 로그인 구현되면 유저 정보 받음
        User user = null;
        itemService.saveItem(imageFiles, items, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok(itemService.getItems());
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItem(id));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<Void> updateItem(@PathVariable Long id,
                           @RequestPart List<MultipartFile> newImageFiles,
                           @RequestPart List<Long> deleteImageIds,
                           @RequestPart ItemRequest.UpdateInDto item) {
        itemService.updateItem(id, newImageFiles, deleteImageIds, item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
