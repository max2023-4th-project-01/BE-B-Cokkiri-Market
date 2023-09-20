package kr.codesquad.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendMessageRequest {
	private Long chatRoomId;
	private Long senderId;
	private String content;

	@Builder
	public SendMessageRequest(Long chatRoomId, Long senderId, String content) {
		this.chatRoomId = chatRoomId;
		this.senderId = senderId;
		this.content = content;
	}
}
