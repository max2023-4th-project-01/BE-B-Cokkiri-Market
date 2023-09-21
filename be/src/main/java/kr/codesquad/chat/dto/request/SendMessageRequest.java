package kr.codesquad.chat.dto.request;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SendMessageRequest {
	private Long chatRoomId;
	private Long senderId;
	private String content;
	private LocalDateTime createdAt;

	@Builder
	public SendMessageRequest(Long chatRoomId, Long senderId, String content, ZonedDateTime createdAt) {
		this.chatRoomId = chatRoomId;
		this.senderId = senderId;
		this.content = content;
		this.createdAt = createdAt.toLocalDateTime();
	}
}
