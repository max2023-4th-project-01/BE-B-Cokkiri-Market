package kr.codesquad.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.chat.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
