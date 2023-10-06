package kr.codesquad.chat.repository;

import static kr.codesquad.chat.entity.QChatMessage.*;
import static kr.codesquad.chat.entity.QChatRoom.*;
import static kr.codesquad.item.entity.QItem.*;
import static kr.codesquad.user.entity.QUser.*;

import java.util.Collections;
import java.util.List;

import kr.codesquad.chat.dto.response.ChatRoomDetailResponse;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.codesquad.chat.dto.vo.ChatMessageCountDataVo;
import kr.codesquad.chat.dto.vo.ChatRoomListVo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChatRoomListRepository {
	private final JPAQueryFactory queryFactory;

	public List<ChatRoomListVo> findAllBy(Long itemId, Long userId) {
		return queryFactory
			.select(Projections.fields(ChatRoomListVo.class,
				chatRoom.id,
				user.id.as("senderId"),
				user.profileImageUrl.as("senderProfileImageUrl"),
				user.nickname.as("senderNickname"),
				item.id.as("itemId"),
				item.thumbnailUrl.as("itemThumbnailUrl"),
				chatMessage.content.as("recentMessage"),
				chatMessage.createdAt.as("updatedAt")
			))
			.from(chatRoom)
			.leftJoin(user).on(chatRoom.senderId.eq(user.id))
			.leftJoin(item).on(chatRoom.itemId.eq(item.id))
			.leftJoin(chatMessage).on(
				chatMessage.chatRoomId.eq(chatRoom.id)
					.and(chatMessage.createdAt.eq(
						JPAExpressions
							.select(chatMessage.createdAt.max())
							.from(chatMessage)
							.where(chatMessage.chatRoomId.eq(chatRoom.id))
					))
			)
			.where(item.userId.eq(userId).or(chatRoom.senderId.eq(userId)), equalItemId(itemId)).fetch();
	}

	public List<ChatMessageCountDataVo> countUnreadChatMessage(Long userId) {
		return queryFactory
			.select(Projections.fields(ChatMessageCountDataVo.class,
				chatRoom.id.as("chatRoomId"),
				chatMessage.isRead,
				chatMessage.senderId
			))
			.from(chatRoom)
			.leftJoin(item).on(chatRoom.itemId.eq(item.id))
			.leftJoin(chatMessage).on(chatMessage.chatRoomId.eq(chatRoom.id))
			.where(chatRoom.senderId.eq(userId).or(item.userId.eq(userId)), chatMessage.isRead.eq(false))
			.fetch();
	}

	private BooleanExpression equalItemId(Long itemId) {
		if (itemId == null) {
			return null;
		}

		return item.id.eq(itemId);
	}

	private BooleanExpression equalSenderId(Long userId) {
		return chatRoom.senderId.eq(userId);
	}

	public ChatRoomDetailResponse findChatRoomDetailSlice(Long chatRoomId, Long userId, Long cursor) {
		ChatRoomDetailResponse response = queryFactory
			.select(Projections.constructor(ChatRoomDetailResponse.class,
					item.id,
					item.title,
					item.price,
					item.status,
					item.thumbnailUrl,
					user.nickname
					)
			)
			.from(chatRoom)
			.leftJoin(item).on(item.id.eq(chatRoom.itemId))
			.leftJoin(user).on(user.id.eq(chatRoom.senderId))
			.where(chatRoom.id.eq(chatRoomId))
			.fetchOne();

		int size = 20;
		List<ChatRoomDetailResponse.Message> messages = queryFactory
				.select(Projections.constructor(ChatRoomDetailResponse.Message.class,
								chatMessage.id,
								chatMessage.senderId.eq(userId).as("isSent"),
								chatMessage.content
				))
				.from(chatMessage)
				.orderBy(chatMessage.id.desc())
				.where(chatMessage.chatRoomId.eq(chatRoomId), chatMessage.id.lt(cursor))
				.limit(size+1)
				.fetch();
		Collections.reverse(messages);

		if (messages.size() == size + 1) {
			response.setNextCursor(messages.get(0).getId() + 1);
			messages.remove(0);
			response.setMessages(messages);
		} else {
			response.setNextCursor(null);
			response.setMessages(messages);
		}

		return response;
	}
}
