package kr.codesquad.item.dto.slice;

import java.util.List;

import kr.codesquad.item.dto.response.UserItemListResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserItemListSlice {
	private final List<UserItemListResponse> items;
	private final Long nextCursor;
}
