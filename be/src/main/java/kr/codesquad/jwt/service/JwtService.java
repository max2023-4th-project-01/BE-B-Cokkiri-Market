package kr.codesquad.jwt.service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.entity.JwtProperties;
import kr.codesquad.util.Constants;
import kr.codesquad.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class JwtService {
	private final RedisUtil redisUtil;
	private final JwtProvider jwtProvider;
	private final JwtProperties jwtProperties;

	public Jwt reissueAccessToken(String refreshToken, String loginId) {
		if (!redisUtil.hasKey(loginId) || !redisUtil.get(loginId).equals(refreshToken)) {
			throw new RuntimeException("잘못된 refreshToken입니다");
		}
		redisUtil.delete(loginId);
		Jwt jwt = jwtProvider.createJwt(Map.of(Constants.LOGIN_ID, loginId));
		redisUtil.setData(loginId, refreshToken, (int)TimeUnit.MILLISECONDS.toMinutes(
			jwtProperties.getRefreshTokenExpirationTime()));
		return jwt;
	}

	public void logout(String accessToken, String loginId) {
		Claims claims = jwtProvider.getClaims(accessToken);
		Date expirationDate = claims.getExpiration();
		Date currentDate = new Date();
		long timeRemaining = expirationDate.getTime() - currentDate.getTime();
		redisUtil.setData(accessToken, accessToken, (int)TimeUnit.MILLISECONDS.toMinutes(timeRemaining));
		redisUtil.delete(loginId);
	}
}
