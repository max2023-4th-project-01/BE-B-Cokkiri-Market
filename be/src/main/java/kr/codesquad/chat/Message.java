package kr.codesquad.chat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import kr.codesquad.core.util.TimeStamped;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Message extends TimeStamped {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Long chatId;
	@Column(nullable = false, length = 200)
	private String content;

	@Builder
	public Message(Long id, Long chatId, String content) {
		this.id = id;
		this.chatId = chatId;
		this.content = content;
	}
}
