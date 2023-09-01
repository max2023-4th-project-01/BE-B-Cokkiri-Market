package kr.codesquad.category.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.codesquad.category.entity.Category;
import kr.codesquad.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public List<Category> getCategories() {
		return categoryRepository.findAll();
	}
}
