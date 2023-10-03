package kr.codesquad.item.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.codesquad.item.dto.request.ItemStatusDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.item.dto.request.ItemSaveRequest;
import kr.codesquad.item.dto.request.ItemUpdateRequest;
import kr.codesquad.item.dto.response.ItemDetailResponse;
import kr.codesquad.item.dto.response.ItemUpdateResponse;
import kr.codesquad.item.dto.slice.ItemListSlice;
import kr.codesquad.item.service.ItemService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
	private final ItemService itemService;

	@PostMapping()
	public ResponseEntity<Map<String, Long>> createItem(@RequestPart List<MultipartFile> imageFiles,
														@RequestPart ItemSaveRequest item, HttpServletRequest request) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("itemId", itemService.saveItem(imageFiles, item, userLoginId)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ItemDetailResponse> getItem(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);
		ItemDetailResponse itemDetailResponse = itemService.getItem(id, userLoginId, request.getCookies());
		Cookie cookie = itemDetailResponse.getCookie();
		itemDetailResponse.setCookieNull();
		if (cookie != null) {
			response.addCookie(cookie);
		}
		return ResponseEntity.ok(itemDetailResponse);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updateItem(@PathVariable Long id,
		@RequestPart List<MultipartFile> newImageFiles,
		@RequestPart List<Long> deleteImageIds,
		@RequestPart ItemUpdateRequest item, HttpServletRequest request) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);
		itemService.updateItem(id, newImageFiles, deleteImageIds, item, userLoginId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{id}/edit")
	public ResponseEntity<ItemUpdateResponse> getItemForUpdate(@PathVariable Long id) {
		return ResponseEntity.ok(itemService.getItemForUpdate(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteItem(@PathVariable Long id, HttpServletRequest request) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);
		itemService.deleteItem(id, userLoginId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping()
	public ResponseEntity<ItemListSlice> readAll(
		@RequestParam(required = false) Long cursor,
		@RequestParam(required = false) Long categoryId,
		@RequestParam(required = false, defaultValue = "10") int size, HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok()
			.body(itemService.readAll(cursor, categoryId, size, loginId));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<ItemStatusDto> updateItemStatus(@PathVariable Long id,
		@RequestBody ItemStatusDto itemStatusDto, HttpServletRequest request) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok().body(itemService.updateItemStatus(id, itemStatusDto, userLoginId));
	}
}
