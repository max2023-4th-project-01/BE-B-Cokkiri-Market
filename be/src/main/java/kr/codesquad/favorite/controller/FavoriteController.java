package kr.codesquad.favorite.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.favorite.dto.request.FavoriteUpdateRequest;
import kr.codesquad.favorite.dto.response.FavoriteUpdateResponse;
import kr.codesquad.favorite.service.FavoriteService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FavoriteController {
	private final FavoriteService favoriteService;

	@PatchMapping("/api/items/{itemId}/favorites")
	public ResponseEntity<FavoriteUpdateResponse> updateFavorite(@PathVariable Long itemId,
		@RequestBody FavoriteUpdateRequest favoriteUpdateRequest, HttpServletRequest request) {
		String userLoginId = (String)request.getAttribute(Constants.LOGIN_ID);

		return ResponseEntity.ok().body(favoriteService.updateFavorite(favoriteUpdateRequest,
			userLoginId, itemId));
	}

}
