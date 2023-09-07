package kr.codesquad.category.dto;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import kr.codesquad.category.dto.response.FavoriteCategoryResponse;
import kr.codesquad.category.entity.Category;

@Mapper
public interface CategoryMapper {
	CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

	FavoriteCategoryResponse toFavoriteCategoryResponse(Category category);
}
