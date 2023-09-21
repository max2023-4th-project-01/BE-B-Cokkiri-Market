package kr.codesquad.user.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.category.dto.response.FavoriteCategoryResponseList;
import kr.codesquad.favorite.service.FavoriteService;
import kr.codesquad.item.dto.slice.UserItemListSlice;
import kr.codesquad.item.service.ItemService;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.dto.response.UpdateProfileImageResponse;
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
	public ResponseEntity<FavoriteCategoryResponseList> favoriteCategories(HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok()
			.body(favoriteService.getFavoriteCategories(loginId));
	}

	@PatchMapping("/profile-image")
	public ResponseEntity<UpdateProfileImageResponse> updateProfileImage(
		@RequestParam(required = false) MultipartFile profileImageFile,
		HttpServletRequest request) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok().body(userService.updateProfileImage(profileImageFile, userLoginId));
	}
}
