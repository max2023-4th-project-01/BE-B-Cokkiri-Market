package kr.codesquad.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.category.dto.response.FavoriteCategoryResponse;
import kr.codesquad.favorite.service.FavoriteService;
import kr.codesquad.item.dto.slice.UserItemListSlice;
import kr.codesquad.item.service.ItemService;
import kr.codesquad.location.dto.request.LocationCreateRequest;
import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.service.UserService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserService userService;

	private final ItemService itemService;
	private final FavoriteService favoriteService;

	@PostMapping()
	public ResponseEntity<Void> signUp(@RequestPart(required = false) MultipartFile profileImageFile,
		@RequestPart("signupData") UserSignUpRequest userSignUpRequest) {
		userService.signUp(userSignUpRequest, profileImageFile);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@GetMapping("locations")
	public ResponseEntity<List<LocationListResponse>> getLocations() {
		return ResponseEntity.ok(userService.getLocations());
	}

	@PostMapping("locations")
	public ResponseEntity<LocationListResponse> createLocation(@RequestBody LocationCreateRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveLocation(request));
	}

	@PatchMapping("locations/{locationId}")
	public ResponseEntity<Void> updateLocation(@PathVariable Long locationId) {
		userService.selectLocation(locationId);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("locations/{locationId}")
	public ResponseEntity<Void> deleteLocation(@PathVariable Long locationId) {
		userService.deleteLocation(locationId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping("/{username}/items")
	public ResponseEntity<UserItemListSlice> userItems(
		@RequestParam(required = false) Long cursor,
		@RequestParam(required = false) Boolean isSold,
		@RequestParam(required = false, defaultValue = "10") int size, @PathVariable String username,
		HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok()
			.body(itemService.getUserItems(cursor, isSold, size, loginId));
	}

	@GetMapping("/favorites")
	public ResponseEntity<UserItemListSlice> favoriteItems(
		@RequestParam(required = false) Long cursor,
		@RequestParam(required = false) Long categoryId,
		@RequestParam(required = false, defaultValue = "10") int size, HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok()
			.body(itemService.getFavoriteItems(cursor, categoryId, size, loginId));
	}

	@GetMapping("/favorites/categories")
	public ResponseEntity<List<FavoriteCategoryResponse>> favoriteCategories(HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok()
			.body(favoriteService.getFavoriteCategories(loginId));
	}
}
