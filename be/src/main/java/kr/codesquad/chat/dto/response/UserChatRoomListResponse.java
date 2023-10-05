package kr.codesquad.chat.dto.response;

import java.time.ZonedDateTime;
import java.util.Map;

import kr.codesquad.chat.dto.vo.ChatRoomListVo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserChatRoomListResponse {
	private Long id;
	private ChatMemberDataResponse chatMember;
	private String recentMessage;
	private int unreadCount;
	private ZonedDateTime updatedAt;
	private ItemDataResponse item;

	public static UserChatRoomListResponse of(ChatRoomListVo chatRoom, Map<Long, Integer> unreadCounts) {
		return UserChatRoomListResponse.builder()
			.id(chatRoom.getId())
			.chatMember(ChatMemberDataResponse.from(chatRoom))
			.recentMessage(chatRoom.getRecentMessage())
			.unreadCount(unreadCounts.getOrDefault(chatRoom.getId(), 0))
			.updatedAt(chatRoom.getUpdatedAt())
			.item(ItemDataResponse.from(chatRoom))
			.build();
	}
}
