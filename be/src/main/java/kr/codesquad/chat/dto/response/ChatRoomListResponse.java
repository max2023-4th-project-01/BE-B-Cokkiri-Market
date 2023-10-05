package kr.codesquad.chat.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomListResponse {
	private final List<UserChatRoomListResponse> chatRooms;
}
