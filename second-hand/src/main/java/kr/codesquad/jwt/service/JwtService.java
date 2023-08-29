package kr.codesquad.jwt.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.jwt.Jwt;
import kr.codesquad.jwt.UserRefreshToken;
import kr.codesquad.jwt.UserRefreshTokenRepository;
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
