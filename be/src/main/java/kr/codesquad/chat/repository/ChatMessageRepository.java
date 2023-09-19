package kr.codesquad.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
