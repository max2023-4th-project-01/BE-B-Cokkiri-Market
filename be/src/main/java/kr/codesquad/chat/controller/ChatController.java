package kr.codesquad.chat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.chat.dto.ChatRoomCreateRequest;
import kr.codesquad.chat.service.ChatService;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ChatController {

	private final ChatService chatService;

	@PostMapping("/")
	public ResponseEntity<Void> createChatRoom(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest,
		HttpServletRequest request) {
		String loginId = (String)request.getAttribute(Constants.LOGIN_ID);
		chatService.createRoom(chatRoomCreateRequest, loginId);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

}
