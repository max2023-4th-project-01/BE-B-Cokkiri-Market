package kr.codesquad.chat.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.chat.dto.ChatMapper;
import kr.codesquad.chat.dto.request.ChatMessageRequest;
import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.request.SendMessageRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.entity.ChatMessage;
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
	private final ChannelTopic channelTopic;
	private final RedisTemplate redisTemplate;

	public ChatRoomCreateResponse createRoom(ChatRoomCreateRequest chatRoomCreateRequest, String loginId) {
		User user = userRepository.findByLoginId(loginId);
		return ChatMapper.INSTANCE.toChatRoomCreateResponse(
			chatRoomRepository.save(ChatMapper.INSTANCE.toChatRoom(chatRoomCreateRequest, user.getId())));
	}

	@Transactional
	public void sendMessage(ChatMessageRequest chatMessageRequest, Long chatRoomId) {

		//채팅 생성 및 저장
		ChatMessage chatMessage = chatMessageRepository.save(ChatMapper.INSTANCE.toChatMessage(chatMessageRequest, chatRoomId));
		String topic = channelTopic.getTopic();

		redisTemplate.convertAndSend(topic, ChatMapper.INSTANCE.toSendMessageRequest(chatMessage, chatMessageRequest.getSenderId()));
	}
}
