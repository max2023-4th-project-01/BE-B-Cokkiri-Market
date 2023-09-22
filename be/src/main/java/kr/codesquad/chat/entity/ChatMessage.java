package kr.codesquad.chat.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import kr.codesquad.util.TimeStamped;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ChatMessage extends TimeStamped {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Long chatRoomId;
	@Column(nullable = false, length = 200)
	private String content;

	@Builder
	public ChatMessage(Long id, Long chatRoomId, String content) {
		this.id = id;
		this.chatRoomId = chatRoomId;
		this.content = content;
	}
}
