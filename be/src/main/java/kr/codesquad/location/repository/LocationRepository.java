package kr.codesquad.location.repository;

import java.util.List;

import kr.codesquad.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
	Location findByUserId(Long userId);

	List<Location> findAllByUserId(long userId);

	List<Location> findAllByUserIdOrderByIsSelectedDesc(Long userId);

	Integer countByUserId(Long userId);
}
