package kr.codesquad.chat.controller;

import javax.servlet.http.HttpServletRequest;

import kr.codesquad.chat.dto.response.ChatRoomDetailResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import kr.codesquad.chat.dto.request.ChatMessageRequest;
import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.dto.response.ChatRoomListResponse;
import kr.codesquad.chat.service.ChatService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ChatController {

	private final ChatService chatService;

	@GetMapping("/api/chatrooms")
	public ResponseEntity<ChatRoomListResponse> showAllUsersChatRooms(@RequestParam(required = false) Long itemId,
		HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok().body(chatService.findChatRoomsBy(itemId, loginId));
	}

	@PostMapping("/api/chatrooms")
	public ResponseEntity<ChatRoomCreateResponse> createChatRoom(
		@RequestBody ChatRoomCreateRequest chatRoomCreateRequest,
		HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(chatService.createRoom(chatRoomCreateRequest, loginId));
	}

	@GetMapping("/api/chatrooms/{chatroomId}")
	public ResponseEntity<ChatRoomDetailResponse> showChatRoomDetail(
		@PathVariable Long chatroomId,
		@RequestParam(required = false) Long cursor,
		HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.ok(chatService.findChatRoomDetail(chatroomId, loginId, cursor));
	}

	@MessageMapping("/chatrooms/{chatRoomId}")
	public void message(@Payload ChatMessageRequest message, @DestinationVariable String chatRoomId) {
		chatService.sendMessage(message, Long.parseLong(chatRoomId));
	}
}
