package kr.codesquad.chat.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import kr.codesquad.chat.dto.response.ChatRoomDetailResponse;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.chat.dto.ChatMapper;
import kr.codesquad.chat.dto.request.ChatMessageRequest;
import kr.codesquad.chat.dto.request.ChatRoomCreateRequest;
import kr.codesquad.chat.dto.response.ChatRoomCreateResponse;
import kr.codesquad.chat.dto.response.ChatRoomListResponse;
import kr.codesquad.chat.dto.response.UserChatRoomListResponse;
import kr.codesquad.chat.dto.vo.ChatMessageCountDataVo;
import kr.codesquad.chat.dto.vo.ChatRoomListVo;
import kr.codesquad.chat.entity.ChatMessage;
import kr.codesquad.chat.repository.ChatMessageRepository;
import kr.codesquad.chat.repository.ChatRoomListRepository;
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
	private final ChatRoomListRepository chatRoomListRepository;

	public ChatRoomCreateResponse createRoom(ChatRoomCreateRequest chatRoomCreateRequest, String loginId) {
		User user = userRepository.findByLoginId(loginId);
		return ChatMapper.INSTANCE.toChatRoomCreateResponse(
			chatRoomRepository.save(ChatMapper.INSTANCE.toChatRoom(chatRoomCreateRequest, user.getId())));
	}

	@Transactional
	public void sendMessage(ChatMessageRequest chatMessageRequest, Long chatRoomId) {
		User user = userRepository.findByNickname(chatMessageRequest.getNickname());
		//채팅 생성 및 저장
		// TODO: 채팅방에 사람이 있다면 ChatMessage 읽음 처리 로직 추가
		ChatMessage chatMessage = chatMessageRepository.save(
			ChatMapper.INSTANCE.toChatMessage(chatMessageRequest, chatRoomId, user.getId()));
		String topic = channelTopic.getTopic();

		redisTemplate.convertAndSend(topic,
			ChatMapper.INSTANCE.toSendMessageRequest(chatMessage, user.getNickname()));
	}

	public ChatRoomListResponse findChatRoomsBy(Long itemId, String loginId) {
		Long userId = userRepository.findByLoginId(loginId).getId();
		List<ChatRoomListVo> chatRoomListVos = chatRoomListRepository.findAllBy(itemId, userId);
		List<ChatMessageCountDataVo> chatMessageCountDataVos = chatRoomListRepository.countUnreadChatMessage(
			userId); // unreadCount만 따로 조회

		Map<Long, Integer> unreadChatMessageCountMap = countUnreadChatMessage(chatMessageCountDataVos, userId);

		// chatRoomListVos에 맞는 unreadCount를 넣어줌.
		List<UserChatRoomListResponse> userChatRoomListResponses = chatRoomListVos.stream()
			.map(chatRoom -> UserChatRoomListResponse.of(chatRoom, unreadChatMessageCountMap))
			.collect(
				Collectors.toUnmodifiableList());

		return ChatRoomListResponse.builder().chatRooms(userChatRoomListResponses).build();
	}

	private Map<Long, Integer> countUnreadChatMessage(List<ChatMessageCountDataVo> chatMessageCountDataVos,
		Long userId) {
		Map<Long, Integer> map = new HashMap<>();
		for (ChatMessageCountDataVo chatMessageCountDataVo : chatMessageCountDataVos) {
			if (chatMessageCountDataVo.getSenderId() != userId && !chatMessageCountDataVo.isRead()) {
				map.put(chatMessageCountDataVo.getChatRoomId(),
					map.getOrDefault(chatMessageCountDataVo.getChatRoomId(), 0) + 1);
			}
		}
		return map;
	}

    public ChatRoomDetailResponse findChatRoomDetail(Long chatroomId, String loginId, Long cursor) {
		Long userId = userRepository.findByLoginId(loginId).getId();

		if (cursor == null) {
			cursor = Long.MAX_VALUE;
		}
		return chatRoomListRepository.findChatRoomDetailSlice(chatroomId, userId, cursor);
	}
}
