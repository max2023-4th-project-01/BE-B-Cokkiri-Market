package kr.codesquad.jwt;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.user.Role;
import kr.codesquad.user.User;
import kr.codesquad.user.UserRepository;

@Component
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;

	public JwtAuthenticationSuccessHandler(JwtProvider jwtProvider, UserRepository userRepository) {
		this.jwtProvider = jwtProvider;
		this.userRepository = userRepository;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		User user = userRepository.findByLoginId(authentication.getName());
		if (user.getRole() == Role.GUEST) {
			String token = jwtProvider.createToken(Map.of("id", user.getId()),
				new Date(System.currentTimeMillis() + 300000));
			response.addHeader("Authorization", "Bearer " + token);
			response.sendRedirect("/sign-up");
			return;

		}

		Jwt jwt = jwtProvider.createJwt(Map.of("id", user.getId()));
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("jwt", jwt);

		response.setContentType("application/json");
		response.getWriter().write(new ObjectMapper().writeValueAsString(responseMap));
	}
}
