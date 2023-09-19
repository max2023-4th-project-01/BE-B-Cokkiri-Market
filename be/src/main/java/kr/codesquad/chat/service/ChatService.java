package kr.codesquad.chat.service;

import org.springframework.stereotype.Service;

import kr.codesquad.chat.dto.ChatMapper;
import kr.codesquad.chat.dto.ChatRoomCreateRequest;
import kr.codesquad.chat.repository.ChatMessageRepository;
import kr.codesquad.chat.repository.ChatRoomRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatService {

	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final UserRepository userRepository;

	public void createRoom(ChatRoomCreateRequest chatRoomCreateRequest, String loginId) {
		User user = userRepository.findByLoginId(loginId);
		chatRoomRepository.save(ChatMapper.INSTANCE.toChatRoom(chatRoomCreateRequest, user.getId()));
	}

}
