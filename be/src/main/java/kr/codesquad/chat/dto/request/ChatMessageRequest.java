package kr.codesquad.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageRequest {
	private String content;
	private String nickname;

	@Builder
	public ChatMessageRequest(String content, String nickname) {
		this.content = content;
		this.nickname = nickname;
	}
}
