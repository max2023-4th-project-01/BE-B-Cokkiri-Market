package kr.codesquad.favorite.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import kr.codesquad.category.dto.CategoryMapper;
import kr.codesquad.category.dto.response.FavoriteCategoryResponse;
import kr.codesquad.category.entity.Category;
import kr.codesquad.favorite.repository.FavoriteDslRespository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {
	private final UserRepository userRepository;
	private final FavoriteDslRespository favoriteDslRespository;

	public List<FavoriteCategoryResponse> getFavoriteCategories(String loginId) {
		User user = userRepository.findByLoginId(loginId);

		List<Category> categories = favoriteDslRespository.readFavoriteCategories(user.getId());
		return categories.stream().map(CategoryMapper.INSTANCE::toFavoriteCategoryResponse)
			.collect(Collectors.toList());
	}
}
