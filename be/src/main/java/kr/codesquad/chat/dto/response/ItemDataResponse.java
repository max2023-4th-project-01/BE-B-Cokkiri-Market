package kr.codesquad.chat.dto.response;

import kr.codesquad.chat.dto.vo.ChatRoomListVo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemDataResponse {
	private Long id;
	private String thumbnailUrl;

	public static ItemDataResponse from(ChatRoomListVo chatRoomListVo) {
		return ItemDataResponse.builder().id(chatRoomListVo.getItemId()).thumbnailUrl(
			chatRoomListVo.getItemThumbnailUrl()).build();
	}
}
