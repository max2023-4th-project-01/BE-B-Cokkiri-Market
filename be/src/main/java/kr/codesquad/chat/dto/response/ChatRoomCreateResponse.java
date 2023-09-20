package kr.codesquad.chat.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomCreateResponse {
	private final Long chatRoomId;
}
