package kr.codesquad.category.repository;

import kr.codesquad.category.dto.response.CategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import kr.codesquad.category.entity.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	@Query("SELECT new kr.codesquad.category.dto.response.CategoryResponse(c.id, c.name, c.iconName) FROM Category c")
	List<CategoryResponse> findAlltoDto();

	@Query("SELECT c.name FROM Category c WHERE c.id = :categoryId")
	String findNameById(Long categoryId);

	@Query("SELECT new kr.codesquad.category.dto.response.CategoryResponse(c.id, c.name) FROM Category c WHERE c.name IN (:s0, :s1, :s2) ORDER BY CASE c.name WHEN :s0 THEN 1 WHEN :s1 THEN 2 WHEN :s2 THEN 3 ELSE 4 END")
	List<CategoryResponse> findByName(String s0, String s1, String s2);
}
