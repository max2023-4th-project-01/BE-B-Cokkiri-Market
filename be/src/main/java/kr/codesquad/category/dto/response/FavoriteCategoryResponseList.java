package kr.codesquad.category.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FavoriteCategoryResponseList {
	List<FavoriteCategoryResponse> categories;
}
