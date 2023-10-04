package kr.codesquad.category.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FavoriteCategoryResponse {
	private final Long id;
	private final String name;
}
