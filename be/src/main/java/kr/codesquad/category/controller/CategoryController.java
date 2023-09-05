package kr.codesquad.category.controller;

import java.util.List;

import kr.codesquad.category.dto.response.CategoryResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.category.entity.Category;
import kr.codesquad.category.service.CategoryService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping("/categories")
	public ResponseEntity<List<CategoryResponse>> getCategories() {
		return ResponseEntity.ok(categoryService.getCategories());
	}

	@GetMapping("/categories/recommend")
	public ResponseEntity<List<CategoryResponse>> createCategory(String title) {
		return ResponseEntity.ok(categoryService.recommendCategory(title));
	}
}
