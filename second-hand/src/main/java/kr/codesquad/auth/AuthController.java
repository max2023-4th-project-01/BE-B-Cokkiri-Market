package kr.codesquad.auth;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.jwt.Jwt;
import kr.codesquad.jwt.JwtProvider;
import kr.codesquad.user.UserService;
import kr.codesquad.user.dto.request.UserSignUpRequest;

@RestController
@RequestMapping("/api")
public class AuthController {
	private static final String USER_ID = "id";
	private final UserService userService;
	private final JwtProvider jwtProvider;

	public AuthController(UserService userService, JwtProvider jwtProvider) {
		this.userService = userService;
		this.jwtProvider = jwtProvider;
	}

	@PostMapping("/users/signUp")
	public Jwt signUp(@RequestBody UserSignUpRequest userSignUpRequest, HttpServletRequest httpServletRequest) {
		Integer userId = (Integer)httpServletRequest.getAttribute(USER_ID);
		userService.signUp(userSignUpRequest, userId.longValue());
		return jwtProvider.createJwt(Map.of("id", userId));
	}
}
