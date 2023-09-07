package kr.codesquad.jwt.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.entity.UserRefreshToken;
import kr.codesquad.jwt.repository.UserRefreshTokenRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtProvider jwtProvider;
	private final UserRefreshTokenRepository userRefreshTokenRepository;
	private final UserRepository userRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		Jwt jwt = jwtProvider.createJwt(Map.of(Constants.LOGIN_ID, authentication.getName()));
		userRefreshTokenRepository.save(UserRefreshToken.builder()
			.userLoginId(authentication.getName())
			.refreshToken(jwt.getRefreshToken())
			.build());

		User user = userRepository.findByLoginId(authentication.getName());
		Map<String, Object> userData = new HashMap<>();
		userData.put("nickname", user.getNickname());
		userData.put("profileImageUrl", user.getProfileImageUrl());

		response.setHeader(HttpHeaders.AUTHORIZATION, Constants.TOKEN_PREFIX + jwt.getAccessToken());
		response.setHeader("Refresh-Token", Constants.TOKEN_PREFIX + jwt.getRefreshToken());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.getWriter().write(new ObjectMapper().writeValueAsString(userData));
	}
}
