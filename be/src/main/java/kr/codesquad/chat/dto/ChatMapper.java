package kr.codesquad.chat.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import kr.codesquad.chat.dto.request.ChatMessageRequest;
import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.request.SendMessageRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.entity.ChatMessage;
import kr.codesquad.chat.entity.ChatRoom;

@Mapper
public interface ChatMapper {
	ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);
	@Mapping(target = "senderId", source = "userId")
	ChatRoom toChatRoom(ChatRoomCreateRequest chatRoomCreateRequest, Long userId);

	@Mapping(target = "chatRoomId", source = "id")
	ChatRoomCreateResponse toChatRoomCreateResponse(ChatRoom chatRoom);

	ChatMessage toChatMessage(ChatMessageRequest chatMessageRequest, Long chatRoomId);

	SendMessageRequest toSendMessageRequest(ChatMessage chatMessage, Long senderId);
}
