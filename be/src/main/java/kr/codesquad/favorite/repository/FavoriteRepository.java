package kr.codesquad.favorite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.favorite.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
	boolean existsByUserIdAndItemId(Long id, Long itemId);

	int countByItemId(Long itemId);
}
