package kr.codesquad.chat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import kr.codesquad.chat.dto.request.ChatMessageRequest;
import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.dto.response.ChatRoomListResponse;
import kr.codesquad.chat.service.ChatService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.HashMap;

@RequiredArgsConstructor
@RestController
public class ChatController {

	private final ChatService chatService;
	private static final HashMap<String, String> sessions = new HashMap<>();


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

	@MessageMapping("/chatrooms/{chatRoomId}")
	public void message(@Payload ChatMessageRequest message, @DestinationVariable String chatRoomId, SimpMessageHeaderAccessor accessor) {
		String loginId = accessor.getSessionAttributes().get(Constants.LOGIN_ID).toString();
		chatService.sendMessage(message, Long.parseLong(chatRoomId), loginId);
	}

	@EventListener(SessionConnectEvent.class)
	public void onConnect(SessionConnectEvent event) {
		String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
		String loginId = event.getMessage().getHeaders().get("nativeHeaders").toString().split(Constants.LOGIN_ID + "=")[1].split("]")[0];

		sessions.put(sessionId, loginId);
	}

	@EventListener(SessionDisconnectEvent.class)
	public void onDisconnect(SessionDisconnectEvent event) {
		sessions.remove(event.getSessionId());
	}

}
