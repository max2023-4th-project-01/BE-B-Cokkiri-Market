package kr.codesquad.core.jwt.service;

import java.util.Map;

import kr.codesquad.core.jwt.UserRefreshTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.core.jwt.Jwt;
import kr.codesquad.core.jwt.UserRefreshToken;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class JwtService {

	private final UserRefreshTokenRepository userRefreshTokenRepository;
	private final JwtProvider jwtProvider;

	@Transactional
	public Jwt reissueAccessToken(String refreshToken) {
		UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByRefreshToken(refreshToken);
		return jwtProvider.reissueAccessToken(Map.of("login_id", userRefreshToken.getUserLoginId()), refreshToken);
	}
}
