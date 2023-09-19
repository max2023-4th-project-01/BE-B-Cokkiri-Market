package kr.codesquad.core.websocket;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class MsgController {
	private final MsgService msgService;

	@PostMapping
	public MsgRoom createRoom(@RequestParam String name) {
		return msgService.createRoom(name);
	}

	@GetMapping
	public List<MsgRoom> findAllRoom() {
		return msgService.findAllRoom();
	}

}
