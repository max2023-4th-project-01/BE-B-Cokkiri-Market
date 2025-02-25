package kr.codesquad.chat.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ChatRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Long itemId;
	@Column(length = 45)
	private String lastMessageId;
	@Column(nullable = false)
	private Long senderId;

	@Builder
	public ChatRoom(Long id, Long itemId, String lastMessageId, Long senderId) {
		this.id = id;
		this.itemId = itemId;
		this.lastMessageId = lastMessageId;
		this.senderId = senderId;
	}
}
