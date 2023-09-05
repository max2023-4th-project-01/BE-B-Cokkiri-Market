package kr.codesquad.user.controller;

import org.springframework.web.bind.annotation.*;

import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserService userService;

	@PostMapping()
	public void signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
		userService.signUp(userSignUpRequest);
	}
}
