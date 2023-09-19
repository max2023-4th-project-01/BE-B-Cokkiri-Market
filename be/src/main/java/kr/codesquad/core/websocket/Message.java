package kr.codesquad.core.websocket;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {
	private String roomId;
	private String sender;
	private String message;
}
