package kr.codesquad.item.dto.slice;

import java.util.List;

import kr.codesquad.item.dto.response.ItemListResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemListSlice {
	private final List<ItemListResponse> items;
	private final String userLocation;
	private final String categoryName;
	private final Long nextCursor;
}
