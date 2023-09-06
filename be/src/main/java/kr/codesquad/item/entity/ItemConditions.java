package kr.codesquad.item.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemConditions {
	private final Long itemId;
	private final String locationName;
	private final Long categoryId;
	private final int pageSize;
	private final Boolean isSold;
	private final Long userId;
	private final Boolean isFavorite;
}
