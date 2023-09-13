package kr.codesquad.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.favorite.entity.Favorite;
import kr.codesquad.favorite.repository.FavoriteRepository;

@Transactional
public class FavoriteRepositoryTest extends IntegrationTestSupport {

	@Autowired
	private FavoriteRepository favoriteRepository;

	@Test
	@DisplayName("사용자의 관심 목록에 추가되었는지 확인한다.")
	void saveTest() {
		// given
		Long userId = 2L;
		Long itemId = 3L;
		Favorite favorite = createFavorite(userId, itemId);

		// when
		Favorite saved = favoriteRepository.save(favorite);

		// then
		assertThat(saved.getId()).isNotNull();
		assertThat(saved)
			.extracting("userId", "itemId")
			.contains(userId, itemId);
	}
	
	@Test
	@DisplayName("사용자의 관심 목록에서 삭제 되었는지 확인한다.")
	void deleteTest() {
		// given
		Long userId = 2L;
		Long itemId = 3L;
		Favorite favorite = createFavorite(userId, itemId);
		Favorite saved = favoriteRepository.save(favorite);

		// when
		favoriteRepository.deleteById(saved.getId());

		// then
		Optional<Favorite> searched = favoriteRepository.findById(saved.getId());
		assertThat(searched.isEmpty()).isTrue();

	}

	@Test
	@DisplayName("사용자의 관심 목록에 추가 된 게시글을 조회한다.")
	void searchByUserIdAndItemIdExistTest() {
		// given
		Long userId = 2L;
		Long itemId = 3L;
		Favorite favorite = createFavorite(userId, itemId);
		Favorite saved = favoriteRepository.save(favorite);

		// when
		Optional<Favorite> searched = favoriteRepository.findByUserIdAndItemId(saved.getUserId(), saved.getItemId());

		// then
		assertThat(searched.isPresent()).isTrue();

	}

	@Test
	@DisplayName("사용자의 관심 목록에 추가 되지 않은 게시글을 조회한다.")
	void searchByUserIdAndItemIdNotExistTest() {
		// given
		Long userId = 2L;
		Long itemId = 3L;
		Favorite favorite = createFavorite(userId, itemId);

		// when
		Optional<Favorite> searched = favoriteRepository.findByUserIdAndItemId(favorite.getUserId(),
			favorite.getItemId());

		// then
		assertThat(searched.isPresent()).isFalse();

	}

	/* ex) favorite에서는 필요 없지만, 리스트를 이용한 테스트가 필요할 때 예시

	@Test
	@DisplayName("findAll")
	void findAllTest() {
		// given

		// when

		// then
		assertThat(items)
			.hasSize(2)
			.extracting("title", "content", "status") // 내가 검색하고자 하는 필드만 추출해서 사용할 수 있다.
			.containsExactlyInAnyOrder( // 순서 상관 없이 안에 있는 값을 확인해 준다.
			tuple("제목1", "내용1", ItemStatus.판매중),
			tuple("제목2", "내용2", ItemStatus.판매완료),
			tuple("제목3", "내용3", ItemStatus.예약중)
		);
	}
	 */

	Favorite createFavorite(Long userId, Long itemId) {
		return Favorite.builder()
			.userId(userId)
			.itemId(itemId).build();
	}

}
