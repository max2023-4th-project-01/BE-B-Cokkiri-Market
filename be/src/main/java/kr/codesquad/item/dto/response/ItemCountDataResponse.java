package kr.codesquad.item.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemCountDataResponse {
	@Builder.Default
	private int chat = 0;
	@Builder.Default
	private int favorite = 0;
	@Builder.Default
	private int view = 0;
}
