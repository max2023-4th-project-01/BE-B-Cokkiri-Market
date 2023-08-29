package kr.codesquad.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
	boolean existsByUserIdAndItemId(Long id, Long id1);
	int countByItemId(Long itemId);
}
