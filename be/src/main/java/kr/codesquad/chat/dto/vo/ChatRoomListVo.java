package kr.codesquad.chat.dto.vo;

import java.time.ZonedDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomListVo {
	private Long id;
	private Long senderId;
	private String senderProfileImageUrl;
	private String senderNickname;
	private String recentMessage;
	private int unreadCount;
	private ZonedDateTime updatedAt;
	private Long itemId;
	private String itemThumbnailUrl;

	@Builder
	public ChatRoomListVo(Long id, Long senderId, String senderProfileImageUrl, String senderNickname,
		String recentMessage,
		int unreadCount, ZonedDateTime updatedAt, Long itemId, String itemThumbnailUrl) {
		this.id = id;
		this.senderId = senderId;
		this.senderProfileImageUrl = senderProfileImageUrl;
		this.senderNickname = senderNickname;
		this.recentMessage = recentMessage;
		this.unreadCount = unreadCount;
		this.updatedAt = updatedAt;
		this.itemId = itemId;
		this.itemThumbnailUrl = itemThumbnailUrl;
	}
}
