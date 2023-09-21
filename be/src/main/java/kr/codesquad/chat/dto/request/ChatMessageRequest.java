package kr.codesquad.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageRequest {

	private Long senderId;
	private String content;

	@Builder
	public ChatMessageRequest(Long senderId, String content) {
		this.senderId = senderId;
		this.content = content;
	}
}
