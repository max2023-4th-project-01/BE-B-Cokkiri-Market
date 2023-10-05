package kr.codesquad.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
	int countByItemId(Long itemId);

    @Query("select cr.id from ChatRoom cr where cr.itemId = :id and cr.senderId = :userId")
    Long findIdByItemIdAndSenderId(Long id, Long userId);
}
