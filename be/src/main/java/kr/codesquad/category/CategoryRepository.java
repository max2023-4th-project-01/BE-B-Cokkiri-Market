package kr.codesquad.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	@Query("SELECT c.name FROM Category c WHERE c.id = :categoryId")
	String findNameById(Long categoryId);
}
