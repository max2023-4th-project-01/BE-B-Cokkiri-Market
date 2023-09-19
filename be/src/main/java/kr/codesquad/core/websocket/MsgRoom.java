package kr.codesquad.core.websocket;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MsgRoom {
	private String roomId;
	private Set<WebSocketSession> sessions = new HashSet<>();

	@Builder
	public MsgRoom(String roomId) {
		this.roomId = roomId;
	}

	public void handleActions(WebSocketSession session, Message message, MsgService msgService) {
		sessions.add(session);
		sendMessage(message, msgService);
	}

	public <T> void sendMessage(T message, MsgService messageService) {
		sessions.parallelStream().forEach(session -> messageService.sendMessage(session, message));
	}

}

