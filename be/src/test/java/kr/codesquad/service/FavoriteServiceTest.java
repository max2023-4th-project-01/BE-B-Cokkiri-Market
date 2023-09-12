package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FavoriteErrorCode;
import kr.codesquad.favorite.dto.request.FavoriteUpdateRequest;
import kr.codesquad.favorite.dto.response.FavoriteUpdateResponse;
import kr.codesquad.favorite.service.FavoriteService;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.ItemStatus;

@Transactional
public class FavoriteServiceTest extends IntegrationTestSupport {

	@Autowired
	private FavoriteService favoriteService;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private UserRepository userRepository;

	@Test
	@DisplayName("좋아요 버튼 클릭 시 관심 상품에 등록한다.")
	void saveFavoriteTest() {
		// given
		Boolean isFavorite = Boolean.TRUE;
		FavoriteUpdateRequest request = createFavoriteUpdateRequest(isFavorite);
		User user = userRepository.save(createUser());
		Item item = itemRepository.save(createItem(user.getId()));

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
		Item item = itemRepository.save(createItem(user.getId()));
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
		assertEquals(FavoriteErrorCode.FAVORITE_ADD_FAILED.getMessage(), exception.getStatusCode().getMessage());

	}

	@Test
	@DisplayName("좋아요 버튼 클릭 시 관심 상품에서 해제한다.")
	void deleteFavoriteTest() {
		// given
		FavoriteUpdateRequest request = createFavoriteUpdateRequest(Boolean.FALSE);
		FavoriteUpdateRequest trueRequest = createFavoriteUpdateRequest(Boolean.TRUE);
		User user = userRepository.save(createUser());
		Item item = itemRepository.save(createItem(user.getId()));
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
		Item item = itemRepository.save(createItem(user.getId()));

		// when
		CustomException exception = assertThrows(CustomException.class, () -> {
			favoriteService.updateFavorite(request,
				user.getLoginId(), item.getId());
		});

		// then
		assertEquals(FavoriteErrorCode.FAVORITE_DELETE_FAILED.getMessage(), exception.getStatusCode().getMessage());
	}

	FavoriteUpdateRequest createFavoriteUpdateRequest(Boolean isFavorite) {
		return new FavoriteUpdateRequest(isFavorite);
	}

	User createUser() {
		return User.builder()
			.id(2L)
			.profileImageUrl("프로필 사진 url")
			.loginId("로그인 한 유저 아이디")
			.password(null)
			.nickname("닉네임")
			.build();
	}

	Item createItem(Long userId) {
		return Item.builder()
			.id(1L)
			.title("제목")
			.content("내용")
			.categoryId(1L)
			.price(1000)
			.locationId(1L)
			.locationName("역삼1동")
			.thumbnailUrl("썸네일url")
			.status(ItemStatus.판매중)
			.userId(userId)
			.viewCount(3)
			.build();
	}

}
