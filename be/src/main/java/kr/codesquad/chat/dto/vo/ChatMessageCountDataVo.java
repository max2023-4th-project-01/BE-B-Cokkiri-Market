package kr.codesquad.chat.dto.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageCountDataVo {
	private Long chatRoomId;
	private boolean isRead;
	private Long senderId;

	@Builder
	public ChatMessageCountDataVo(Long chatRoomId, boolean isRead, Long senderId) {
		this.chatRoomId = chatRoomId;
		this.isRead = isRead;
		this.senderId = senderId;
	}
}
