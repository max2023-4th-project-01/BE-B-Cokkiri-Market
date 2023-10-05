package kr.codesquad.chat.dto.response;

import kr.codesquad.chat.dto.vo.ChatRoomListVo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMemberDataResponse {
	private Long id;
	private String profileImageUrl;
	private String nickname;

	public static ChatMemberDataResponse from(ChatRoomListVo chatRoomListVo) {
		return ChatMemberDataResponse.builder().id(chatRoomListVo.getSenderId()).profileImageUrl(
			chatRoomListVo.getSenderProfileImageUrl()).nickname(chatRoomListVo.getSenderNickname()).build();
	}

}
