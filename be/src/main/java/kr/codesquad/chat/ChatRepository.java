package kr.codesquad.chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
	int countByItemId(Long itemId);
}
