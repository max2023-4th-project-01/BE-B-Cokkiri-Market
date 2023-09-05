package kr.codesquad.item.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemCountDataResponse {
	private int chat;
	private int favorite;
	private int view;
}
