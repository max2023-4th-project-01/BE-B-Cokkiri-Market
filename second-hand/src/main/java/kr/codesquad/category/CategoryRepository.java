package kr.codesquad.category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	String findNameById(Long categoryId);
}
