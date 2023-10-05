package kr.codesquad.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendMessageRequest {

	private Long id;
	private Long chatRoomId;
	private String nickname;
	private String content;

	@Builder
	public SendMessageRequest(Long id, Long chatRoomId, String nickname, String content) {
		this.id = id;
		this.chatRoomId = chatRoomId;
		this.nickname = nickname;
		this.content = content;
	}
}
