package kr.codesquad.repository;

import static org.assertj.core.api.Assertions.*;

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
		Favorite favorite = Favorite.builder()
			.id(1L)
			.userId(2L)
			.itemId(3L).build();

		// when
		Favorite saved = favoriteRepository.save(favorite);

		// then
		assertThat(saved)
			.extracting("id", "userId", "itemId")
			.contains(1L, 2L, 3L);
	}

	// TODO: 작성
	// @Test
	// @DisplayName("사용자의 관심 목록에서 삭제 되었는지 확인한다.")
	// void deleteTest() {
	// 	// given
	// 	favoriteRepository.deleteById(foundFavorite.getId());
	// 	// when
	//
	// 	// then
	//
	// }
	//
	// @Test
	// @DisplayName("사용자의 관심 목록에 추가 된 게시글인지 조회한다.")
	// void test() {
	// 	// given
	//
	// 	// favorite에 저장
	//
	//
	// 	// when
	// 	favoriteRepository.findByUserIdAndItemId(userId, itemId);
	//
	// 	// then
	//
	// }

	// TODO: favorite에서는 필요 없지만, 리스트를 이용한 테스트가 필요할 때 예시
	// @Test
	// @DisplayName("findAll")
	// void findAllTest() {
	// 	// given
	//
	// 	// when
	//
	// 	// then
	// 	assertThat(items)
	// 		.hasSize(2)
	// 		.extracting("title", "content", "status") // 내가 검색하고자 하는 필드만 추출해서 사용할 수 있다.
	// 		.containsExactlyInAnyOrder( // 순서 상관 없이 안에 있는 값을 확인해 준다.
	// 		tuple("제목1", "내용1", ItemStatus.판매중),
	// 		tuple("제목2", "내용2", ItemStatus.판매완료),
	// 		tuple("제목3", "내용3", ItemStatus.예약중)
	// 	);
	// }
}
