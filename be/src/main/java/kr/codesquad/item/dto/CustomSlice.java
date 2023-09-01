package kr.codesquad.item.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CustomSlice<T> {
	private final List<T> items;
	private final Paging pageable;
	private final String userLocation;
	private final String categoryName;

	@Builder
	public CustomSlice(List<T> items, Long nextCursor, boolean hasNext, String userLocation, String categoryName) {
		this.items = items;
		this.pageable = new Paging(nextCursor, hasNext);
		this.userLocation = userLocation;
		this.categoryName = categoryName;
	}

	@AllArgsConstructor
	@Getter
	public static class Paging {
		private final Long nextCursor;
		private final boolean hasNext;
	}
}
