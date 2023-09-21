package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.entity.JwtProperties;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.jwt.service.JwtService;
import kr.codesquad.util.Constants;
import kr.codesquad.util.RedisUtil;

@Transactional
public class JwtServiceTest extends IntegrationTestSupport {
	@Autowired
	JwtService jwtService;
	@Autowired
	JwtProvider jwtProvider;
	@Autowired
	RedisUtil redisUtil;
	@Autowired
	JwtProperties jwtProperties;

	@DisplayName("토큰 재발급 메소드 호출 시 db에 refresh 토큰이 확인되면 재발급을 해준다.")
	@Test
	void reissueRefreshTokenSuccessTest() {
		// given
		String userLoginId = "loginId";
		Jwt jwt = jwtProvider.createJwt(Map.of(Constants.LOGIN_ID, userLoginId));
		String refreshToken = jwt.getRefreshToken();
		redisUtil.setData(userLoginId, refreshToken, (int)TimeUnit.MILLISECONDS.toMinutes(
			jwtProperties.getRefreshTokenExpirationTime()));

		// when
		Jwt reissuedJwt = jwtService.reissueAccessToken(refreshToken, userLoginId);

		// then
		assertThat(reissuedJwt).isNotNull();
		assertThat(reissuedJwt.getRefreshToken()).isNotEqualTo(refreshToken);
	}

	@DisplayName("로그아웃 시 블랙리스트에 accestoken이 추가되고 유저에 대한 refreshToken이 삭제된다")
	@Test
	void logoutTest() {
		// given
		String userLoginId = "loginId";
		Jwt jwt = jwtProvider.createJwt(Map.of(Constants.LOGIN_ID, userLoginId));
		String accessToken = jwt.getAccessToken();
		String refreshToken = jwt.getRefreshToken();
		redisUtil.setData(userLoginId, refreshToken, (int)TimeUnit.MILLISECONDS.toMinutes(
			jwtProperties.getRefreshTokenExpirationTime()));

		// when
		jwtService.logout(accessToken, userLoginId);

		// then
		assertThat(redisUtil.hasKey(userLoginId)).isFalse();
		assertThat(redisUtil.hasKey(accessToken)).isTrue();
	}
}
