package kr.codesquad.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.jwt.dto.request.JwtRefreshTokenRequest;
import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {
	private final JwtService jwtService;

	@GetMapping("/reissue-access-token")
	public Jwt reissueToken(@RequestBody JwtRefreshTokenRequest request) {
		return jwtService.reissueAccessToken(
			request.getRefreshToken());
	}
}
