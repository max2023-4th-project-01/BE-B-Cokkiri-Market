package kr.codesquad.category;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping("/categories")
	public List<Category> getCategories() {
		return categoryService.getCategories();
	}
}
