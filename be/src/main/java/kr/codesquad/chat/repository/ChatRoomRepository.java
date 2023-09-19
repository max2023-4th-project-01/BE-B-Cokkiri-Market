package kr.codesquad.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
	int countByItemId(Long itemId);
}
