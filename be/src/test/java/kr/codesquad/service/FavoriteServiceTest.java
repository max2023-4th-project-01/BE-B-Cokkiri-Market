package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.category.dto.response.FavoriteCategoryResponse;
import kr.codesquad.category.dto.response.FavoriteCategoryResponseList;
import kr.codesquad.category.entity.Category;
import kr.codesquad.category.repository.CategoryRepository;
import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FavoriteErrorCode;
import kr.codesquad.favorite.dto.request.FavoriteUpdateRequest;
import kr.codesquad.favorite.dto.response.FavoriteUpdateResponse;
import kr.codesquad.favorite.entity.Favorite;
import kr.codesquad.favorite.repository.FavoriteRepository;
import kr.codesquad.favorite.service.FavoriteService;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.ItemStatus;

public class FavoriteServiceTest extends IntegrationTestSupport {

	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	FavoriteRepository favoriteRepository;
	@Autowired
	FavoriteService favoriteService;
	@Autowired
	ItemRepository itemRepository;
	@Autowired
	UserRepository userRepository;

	@AfterEach
	void dbClean() {
		favoriteRepository.deleteAllInBatch();
		userRepository.deleteAllInBatch();
		itemRepository.deleteAllInBatch();
		categoryRepository.deleteAllInBatch();
	}

	@Test
	@DisplayName("좋아요 버튼 클릭 시 관심 상품에 등록한다.")
	void saveFavoriteTest() {
		// given
		Boolean isFavorite = Boolean.TRUE;
		FavoriteUpdateRequest request = createFavoriteUpdateRequest(isFavorite);
		User user = userRepository.save(createUser());
		Category category = categoryRepository.save(createCategory());
		Item item = itemRepository.save(createItem(user.getId(), category.getId()));

		// when
		FavoriteUpdateResponse response = favoriteService.updateFavorite(request,
			user.getLoginId(), item.getId());

		// then
		assertThat(response.getIsFavorite()).isEqualTo(Boolean.TRUE);

	}

	@Test
	@DisplayName("이미 관심 상품에 등록되어 있는 상품을 재등록 하려는 경우, 예외가 발생한다.")
	void saveFavoriteExceptionTest() {
		// given
		Boolean isFavorite = Boolean.TRUE;
		FavoriteUpdateRequest request = createFavoriteUpdateRequest(isFavorite);
		User user = userRepository.save(createUser());
		Category category = categoryRepository.save(createCategory());
		Item item = itemRepository.save(createItem(user.getId(), category.getId()));
		favoriteService.updateFavorite(request,
			user.getLoginId(), item.getId());

		// when
		CustomException exception = assertThrows(CustomException.class, () -> {
			favoriteService.updateFavorite(request,
				user.getLoginId(), item.getId());
		});

		// 커스텀 예외가 아닐 때 강의에서는 이렇게 작성 함.
		// assertThatThrownBy(() -> favoriteService.updateFavorite(request,
		// 	user.getLoginId(), item.getId())).isInstanceOf(CustomException.class)
		// 	.hasMessage(FavoriteErrorCode.FAVORITE_ADD_FAILED.getMessage());

		// then
		assertThat(FavoriteErrorCode.FAVORITE_ADD_FAILED.getMessage()).isEqualTo(
			exception.getStatusCode().getMessage());

	}

	@Test
	@DisplayName("좋아요 버튼 클릭 시 관심 상품에서 해제한다.")
	void deleteFavoriteTest() {
		// given
		FavoriteUpdateRequest request = createFavoriteUpdateRequest(Boolean.FALSE);
		FavoriteUpdateRequest trueRequest = createFavoriteUpdateRequest(Boolean.TRUE);
		User user = userRepository.save(createUser());
		Category category = categoryRepository.save(createCategory());
		Item item = itemRepository.save(createItem(user.getId(), category.getId()));
		favoriteService.updateFavorite(trueRequest,
			user.getLoginId(), item.getId());

		// when
		FavoriteUpdateResponse response = favoriteService.updateFavorite(request,
			user.getLoginId(), item.getId());

		// then
		assertThat(response.getIsFavorite()).isEqualTo(Boolean.FALSE);
	}

	@Test
	@DisplayName("관심 상품에 등록되어있지 않은 상품을 해제하려 하려는 경우, 예외가 발생한다.")
	void deleteFavoriteExceptionTest() {
		// given
		Boolean isFavorite = Boolean.FALSE;
		FavoriteUpdateRequest request = createFavoriteUpdateRequest(isFavorite);
		User user = userRepository.save(createUser());
		Category category = categoryRepository.save(createCategory());
		Item item = itemRepository.save(createItem(user.getId(), category.getId()));

		// when
		CustomException exception = assertThrows(CustomException.class, () -> {
			favoriteService.updateFavorite(request,
				user.getLoginId(), item.getId());
		});

		// then
		assertThat(FavoriteErrorCode.FAVORITE_DELETE_FAILED.getMessage()).isEqualTo(
			exception.getStatusCode().getMessage());
	}

	@Test
	@DisplayName("유저 관심품목의 카테고리를 반환한다")
	void getFavoriteCategoriesTest() {
		// given
		User user = userRepository.save(createUser());
		Category category = categoryRepository.save(createCategory());
		Category category1 = categoryRepository.save(createCategory());
		Item item = itemRepository.save(createItem(user.getId(), category.getId()));
		Item item1 = itemRepository.save(createItem(user.getId(), category1.getId()));
		favoriteRepository.save(createFavorite(user.getId(), item.getId()));
		favoriteRepository.save(createFavorite(user.getId(), item1.getId()));
		List<Category> favoriteCategories = new ArrayList<>(List.of(category, category1));

		Category notFavoritecategory = categoryRepository.save(createCategory());
		Item item2 = itemRepository.save(createItem(user.getId(), notFavoritecategory.getId()));
		// when
		FavoriteCategoryResponseList categoryResponses = favoriteService.getFavoriteCategories(user.getLoginId());

		// then
		assertThat(categoryResponses.getCategories().size()).isEqualTo(favoriteCategories.size());
		for (FavoriteCategoryResponse categoryResponse : categoryResponses.getCategories()) {
			assertThat(categoryResponse.getId()).isNotEqualTo(notFavoritecategory.getId());
		}
	}

	FavoriteUpdateRequest createFavoriteUpdateRequest(Boolean isFavorite) {
		return new FavoriteUpdateRequest(isFavorite);
	}

	User createUser() {
		return User.builder()
			.profileImageUrl("프로필 사진 url")
			.loginId("로그인 한 유저 아이디")
			.password(null)
			.nickname("닉네임")
			.build();
	}

	Item createItem(Long userId, Long categoryId) {
		return Item.builder()
			.title("제목")
			.content("내용")
			.categoryId(categoryId)
			.price(1000)
			.locationId(1L)
			.locationName("역삼1동")
			.thumbnailUrl("썸네일url")
			.status(ItemStatus.판매중)
			.userId(userId)
			.viewCount(3)
			.build();
	}

	Category createCategory() {
		return new Category("name", "iconName");
	}

	Favorite createFavorite(Long userId, Long itemId) {
		return Favorite.builder().userId(userId).itemId(itemId).build();
	}

}
