package kr.codesquad.favorite.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteUpdateRequest {
	private Boolean isFavorite;

}
