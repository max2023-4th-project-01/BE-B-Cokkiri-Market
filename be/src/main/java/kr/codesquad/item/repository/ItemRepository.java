package kr.codesquad.item.repository;

import kr.codesquad.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

	@Query("select i.status from Item i join User u on i.userId = u.id where i.id = :id and u.loginId = :userLoginId")
	boolean existsByIdAndUserLoginId(Long id, String userLoginId);
}
