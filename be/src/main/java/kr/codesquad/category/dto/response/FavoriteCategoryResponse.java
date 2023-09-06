package kr.codesquad.category.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FavoriteCategoryResponse {
	private final Long id;
	private final String name;
}
