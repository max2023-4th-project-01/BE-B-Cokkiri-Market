package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.entity.UserRefreshToken;
import kr.codesquad.jwt.repository.UserRefreshTokenRepository;
import kr.codesquad.jwt.service.JwtService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class JwtServiceTest {
	@Autowired
	JwtService jwtService;
	@Autowired
	UserRefreshTokenRepository userRefreshTokenRepository;

	@DisplayName("토큰 재발급 메소드 호출 시 db에 refresh 토큰이 확인되면 재발급을 해준다.")
	@Test
	void reissueRefreshTokenSuccessTest() {
		// given
		String refreshToken = "refreshToken";
		String userLoginId = "loginId";
		UserRefreshToken userRefreshToken = UserRefreshToken.builder()
			.refreshToken(refreshToken)
			.userLoginId(userLoginId)
			.build();
		userRefreshTokenRepository.save(userRefreshToken);

		// when
		Jwt jwt = jwtService.reissueAccessToken(refreshToken);

		// then
		assertThat(jwt).isNotNull();
		assertThat(jwt.getRefreshToken()).isEqualTo(refreshToken);
	}
}
