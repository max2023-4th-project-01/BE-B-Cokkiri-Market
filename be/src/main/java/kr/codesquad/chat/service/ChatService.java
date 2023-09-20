package kr.codesquad.chat.service;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.chat.dto.ChatMapper;
import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.request.SendMessageRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.repository.ChatMessageRepository;
import kr.codesquad.chat.repository.ChatRoomRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;
	private final ConcurrentMap<Long, Set<WebSocketSession>> sessionMap = new ConcurrentHashMap<>();

	public ChatRoomCreateResponse createRoom(ChatRoomCreateRequest chatRoomCreateRequest, String loginId) {
		User user = userRepository.findByLoginId(loginId);
		return ChatMapper.INSTANCE.toChatRoomCreateResponse(
			chatRoomRepository.save(ChatMapper.INSTANCE.toChatRoom(chatRoomCreateRequest, user.getId())));
	}

	public void sendMessage(Long chatRoomId, WebSocketSession session, SendMessageRequest message) {
		if (!sessionMap.containsKey(chatRoomId)) {
			sessionMap.put(chatRoomId, new HashSet<>());
		}
		Set<WebSocketSession> sessions = sessionMap.get(chatRoomId);
		sessions.add(session);
		sessionMap.put(chatRoomId, sessions);
		sessions.parallelStream().forEach(s -> sendMessage(s, message));
	}

	private <T> void sendMessage(WebSocketSession session, T message) {
		try {
			session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
	}

}
