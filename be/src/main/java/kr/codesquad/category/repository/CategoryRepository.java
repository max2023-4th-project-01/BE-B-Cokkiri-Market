package kr.codesquad.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import kr.codesquad.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	@Query("SELECT c.name FROM Category c WHERE c.id = :categoryId")
	String findNameById(Long categoryId);
}
