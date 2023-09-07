package kr.codesquad.favorite.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.favorite.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
	boolean existsByUserIdAndItemId(Long id, Long itemId);

	int countByItemId(Long itemId);

	Optional<Favorite> findByUserIdAndItemId(Long userId, Long itemId);
}
