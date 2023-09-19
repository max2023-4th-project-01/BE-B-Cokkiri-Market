package kr.codesquad.auth.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.jwt.dto.request.JwtRefreshTokenRequest;
import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.jwt.service.JwtService;
import kr.codesquad.util.Constants;
import kr.codesquad.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {
	private final JwtService jwtService;
	private final JwtProvider jwtProvider;
	private final RedisUtil redisUtil;

	@GetMapping("/reissue-access-token")
	public Jwt reissueToken(@RequestBody JwtRefreshTokenRequest jwtRefreshTokenRequest, HttpServletRequest request) {
		return jwtService.reissueAccessToken(
			jwtRefreshTokenRequest.getRefreshToken(), (String)request.getAttribute(Constants.LOGIN_ID));
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logout(HttpServletRequest request) {
		String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(
			Constants.TOKEN_PREFIX.length()).replace("\"", "");
		jwtService.logout(accessToken, (String)request.getAttribute(Constants.LOGIN_ID));
		return ResponseEntity.ok().build();
	}
}
