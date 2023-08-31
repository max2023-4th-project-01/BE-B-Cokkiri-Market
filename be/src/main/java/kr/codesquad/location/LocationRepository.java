package kr.codesquad.location;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import kr.codesquad.location.dto.LocationResponse;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
	Location findByUserId(Long userId);

	List<Location> findAllByUserId(long userId);

	List<Location> findAllByUserIdOrderByIsSelectedDesc(Long userId);

	Integer countByUserId(Long userId);
}
