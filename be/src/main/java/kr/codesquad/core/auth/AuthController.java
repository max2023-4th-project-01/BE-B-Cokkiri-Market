package kr.codesquad.core.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.core.jwt.Jwt;
import kr.codesquad.core.jwt.dto.request.JwtRefreshTokenRequest;
import kr.codesquad.core.jwt.service.JwtService;
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
