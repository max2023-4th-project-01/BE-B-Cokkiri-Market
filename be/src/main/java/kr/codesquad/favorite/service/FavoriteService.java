package kr.codesquad.favorite.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.category.dto.CategoryMapper;
import kr.codesquad.category.dto.response.FavoriteCategoryResponse;
import kr.codesquad.category.entity.Category;
import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FavoriteErrorCode;
import kr.codesquad.favorite.dto.request.FavoriteUpdateRequest;
import kr.codesquad.favorite.dto.response.FavoriteUpdateResponse;
import kr.codesquad.favorite.entity.Favorite;
import kr.codesquad.favorite.repository.FavoriteDslRespository;
import kr.codesquad.favorite.repository.FavoriteRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {
	private final UserRepository userRepository;
	private final FavoriteDslRespository favoriteDslRespository;
	private final FavoriteRepository favoriteRepository;

	public List<FavoriteCategoryResponse> getFavoriteCategories(String loginId) {
		User user = userRepository.findByLoginId(loginId);

		List<Category> categories = favoriteDslRespository.readFavoriteCategories(user.getId());
		return categories.stream().map(CategoryMapper.INSTANCE::toFavoriteCategoryResponse)
			.collect(Collectors.toList());
	}

	@Transactional
	public FavoriteUpdateResponse updateFavorite(FavoriteUpdateRequest favoriteUpdateRequest, String userLoginId,
		Long itemId) {
		Boolean isFavorite = favoriteUpdateRequest.getIsFavorite();
		Long userId = userRepository.findByLoginId(userLoginId).getId();
		Favorite favorite = Favorite.builder().userId(userId).itemId(itemId).build();
		
		if (isFavorite) { // 좋아요 등록
			addFavorite(favorite);
		} else if (!isFavorite) { // 좋아요 해제
			deleteFavorite(favorite);
		}

		return new FavoriteUpdateResponse(isFavorite);
	}

	private void addFavorite(Favorite favorite) {
		Optional<Favorite> optionalFavorite = favoriteRepository.findByUserIdAndItemId(favorite.getUserId(),
			favorite.getItemId());

		// 이미 좋아요 눌러져있는 게시물이면
		if (optionalFavorite.isPresent()) {
			throw new CustomException(FavoriteErrorCode.FAVORITE_ADD_FAILED);
		}

		favoriteRepository.save(favorite);
	}

	private void deleteFavorite(Favorite favorite) {
		Optional<Favorite> optionalFavorite = favoriteRepository.findByUserIdAndItemId(favorite.getUserId(),
			favorite.getItemId());

		// 이미 좋아요 취소 된 게시물이면
		Favorite foundFavorite = optionalFavorite.orElseThrow(
			() -> new CustomException(FavoriteErrorCode.FAVORITE_DELETE_FAILED));

		favoriteRepository.deleteById(foundFavorite.getId());
	}

}
