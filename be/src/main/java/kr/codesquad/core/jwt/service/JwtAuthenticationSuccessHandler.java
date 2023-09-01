package kr.codesquad.core.jwt.service;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.codesquad.core.jwt.UserRefreshTokenRepository;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.core.jwt.Jwt;
import kr.codesquad.core.jwt.UserRefreshToken;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtProvider jwtProvider;
	private final UserRefreshTokenRepository userRefreshTokenRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		Jwt jwt = jwtProvider.createJwt(Map.of("login_id", authentication.getName()));
		userRefreshTokenRepository.save(UserRefreshToken.builder()
			.userLoginId(authentication.getName())
			.refreshToken(jwt.getRefreshToken())
			.build());

		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.getWriter().write(new ObjectMapper().writeValueAsString(jwt));
	}
}
