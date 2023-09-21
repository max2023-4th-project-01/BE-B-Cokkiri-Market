package kr.codesquad.chat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.request.SendMessageRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.service.ChatService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ChatController {

	private final ChatService chatService;

	@PostMapping("/api/chat")
	public ResponseEntity<ChatRoomCreateResponse> createChatRoom(
		@RequestBody ChatRoomCreateRequest chatRoomCreateRequest,
		HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(chatService.createRoom(chatRoomCreateRequest, loginId));
	}

	@MessageMapping("/comm/message")
	public void message(SendMessageRequest message) {
		chatService.sendMessage(message);
	}
}
