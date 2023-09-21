package kr.codesquad.chat.service;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.chat.dto.request.SendMessageRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplate;
	private final SimpMessageSendingOperations messagingTemplate;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			String publishMessage = (String)redisTemplate.getStringSerializer().deserialize(message.getBody());

			SendMessageRequest roomMessage = objectMapper.readValue(publishMessage, SendMessageRequest.class);

			messagingTemplate.convertAndSend("/sub/chatrooms/" + roomMessage.getChatRoomId(), roomMessage);

		} catch (Exception e) {
			throw new RuntimeException("뭐");
		}
	}
}
