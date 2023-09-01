package kr.codesquad.item.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CustomSlice<T> {
	private final List<T> items;
	private final String userLocation;
	private final String categoryName;
	private final Long nextCursor;
	private final boolean hasNext;

	@Builder
	public CustomSlice(List<T> items, Long nextCursor, boolean hasNext, String userLocation, String categoryName) {
		this.items = items;
		this.userLocation = userLocation;
		this.categoryName = categoryName;
		this.nextCursor = nextCursor;
		this.hasNext = hasNext;
	}

}
