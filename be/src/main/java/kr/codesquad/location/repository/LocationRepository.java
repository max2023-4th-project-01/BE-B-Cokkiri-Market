package kr.codesquad.location.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.codesquad.location.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
	@Query("SELECT l FROM Location l WHERE l.userId = :userId AND l.isSelected = true")
	Location findSelectedLocationByUserId(@Param("userId") Long userId);

	List<Location> findAllByUserId(long userId);

	List<Location> findAllByUserIdOrderByIsSelectedDesc(Long userId);

	Integer countByUserId(Long userId);

	@Query("SELECT l.locationName FROM Location l WHERE l.id = :myLocationId")
	String findLocationNameById(Long myLocationId);
}
