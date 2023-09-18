package kr.codesquad.jwt.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.jwt.entity.Jwt;
import kr.codesquad.jwt.entity.JwtProperties;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.Constants;
import kr.codesquad.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtProvider jwtProvider;
	private final JwtProperties jwtProperties;
	private final RedisUtil redisUtil;
	private final UserRepository userRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		String loginId = authentication.getName();
		Jwt jwt = jwtProvider.createJwt(Map.of(Constants.LOGIN_ID, loginId));
		redisUtil.setData(loginId, jwt.getRefreshToken(), (int)TimeUnit.MILLISECONDS.toMinutes(
			jwtProperties.getRefreshTokenExpirationTime()));

		User user = userRepository.findByLoginId(loginId);
		Map<String, Object> userData = new HashMap<>();
		userData.put("nickname", user.getNickname());
		userData.put("profileImageUrl", user.getProfileImageUrl());

		response.setHeader(HttpHeaders.AUTHORIZATION, Constants.TOKEN_PREFIX + jwt.getAccessToken());
		response.setHeader(Constants.REFRESH_TOKEN, Constants.TOKEN_PREFIX + jwt.getRefreshToken());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.getWriter().write(new ObjectMapper().writeValueAsString(userData));
	}
}
