package kr.codesquad.core.filter;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.user.dto.request.UserLoginRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req,
		HttpServletResponse res) throws AuthenticationException {
		try {

			UserLoginRequest creds = new ObjectMapper()
				.readValue(req.getInputStream(), UserLoginRequest.class);

			return authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
					creds.getUsername(),
					creds.getPassword(),
					new ArrayList<>())
			);

		} catch (IOException e) {
			// TODO: 커스텀 exception 만들기
			throw new RuntimeException(e);
		}
	}
}
