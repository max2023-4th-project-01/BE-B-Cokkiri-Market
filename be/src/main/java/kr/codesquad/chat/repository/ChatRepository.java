package kr.codesquad.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.chat.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
	int countByItemId(Long itemId);
}
