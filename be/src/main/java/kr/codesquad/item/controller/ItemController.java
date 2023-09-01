package kr.codesquad.item.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.item.dto.CustomSlice;
import kr.codesquad.item.dto.ItemListResponse;
import kr.codesquad.item.dto.ItemRequest;
import kr.codesquad.item.dto.ItemResponse;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.service.ItemService;
import kr.codesquad.user.User;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
	private static final String LOGIN_ID = "login_id";
	private final ItemService itemService;

	@PostMapping()
	public ResponseEntity<Long> createItem(@RequestPart List<MultipartFile> imageFiles,
		@RequestPart ItemRequest.SaveInDto items) {
		// 로그인 구현되면 유저 정보 받음
		User user = null;
		return ResponseEntity.status(HttpStatus.CREATED).body(itemService.saveItem(imageFiles, items, user));
	}

	@GetMapping()
	public ResponseEntity<List<Item>> getItems() {
		return ResponseEntity.ok(itemService.getItems());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ItemResponse.DetailOutDto> getItem(@PathVariable Long id) {
		return ResponseEntity.ok(itemService.getItem(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updateItem(@PathVariable Long id,
		@RequestPart List<MultipartFile> newImageFiles,
		@RequestPart List<Long> deleteImageIds,
		@RequestPart ItemRequest.UpdateInDto item) {
		itemService.updateItem(id, newImageFiles, deleteImageIds, item);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{id}/edit")
	public ResponseEntity<ItemResponse.UpdateOutDto> getItemForUpdate(@PathVariable Long id) {
		return ResponseEntity.ok(itemService.getItemForUpdate(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
		itemService.deleteItem(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping("/list")
	public ResponseEntity<CustomSlice<ItemListResponse>> readAll(
		@RequestParam(required = false) Long cursor,
		@RequestParam(required = false) Long categoryId,
		@RequestParam(required = false, defaultValue = "10") int size, HttpServletRequest request) {
		String loginId = (String)request.getAttribute(LOGIN_ID);
		return ResponseEntity.ok()
			.body(itemService.readAll(cursor, categoryId, size, loginId));
	}
}
