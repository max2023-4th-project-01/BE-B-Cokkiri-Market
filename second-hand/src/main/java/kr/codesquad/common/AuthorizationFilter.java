package kr.codesquad.common;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.cors.CorsUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import kr.codesquad.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthorizationFilter implements Filter {
	private static final String TOKEN_PREFIX = "Bearer ";
	private static final String HEADER_AUTHORIZATION = "Authorization";
	private static final String USER_ID = "id";
	private static final String[] whiteListUris = {"/h2-console/**", "/api/signup", "/api/login",
		"/api/members/signup/**",
		"/api/reissue-access-token", "/api/oauth/**", "/api/redirect/**"};

	private final JwtProvider jwtProvider;
	private final ObjectMapper objectMapper;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
		throws ServletException, IOException {

		HttpServletRequest httpServletRequest = (HttpServletRequest)request;
		if (CorsUtils.isPreFlightRequest(httpServletRequest)) {
			chain.doFilter(request, response);
			return;
		}
		if (whiteListCheck(httpServletRequest.getRequestURI())) {
			chain.doFilter(request, response);
			return;
		}

		if (!isContainToken(httpServletRequest)) {
			throw new MalformedJwtException("");
		}

		try {
			String token = getToken(httpServletRequest);
			Claims claims = jwtProvider.getClaims(token);
			request.setAttribute(USER_ID, claims.get(USER_ID));
			SecurityContextHolder.getContext()
				.setAuthentication(
					new UsernamePasswordAuthenticationToken(claims.getSubject(), null, new ArrayList<>()));
			chain.doFilter(request, response);
		} catch (RuntimeException e) {
			throw new MalformedJwtException("");
		}
	}

	private boolean whiteListCheck(String uri) {
		return PatternMatchUtils.simpleMatch(whiteListUris, uri);
	}

	private boolean isContainToken(HttpServletRequest request) {
		String authorization = request.getHeader(HEADER_AUTHORIZATION);
		return authorization != null && authorization.startsWith(TOKEN_PREFIX);
	}

	private String getToken(HttpServletRequest request) {
		String authorization = request.getHeader(HEADER_AUTHORIZATION);
		return authorization.substring(7).replace("\"", "");
	}
}
