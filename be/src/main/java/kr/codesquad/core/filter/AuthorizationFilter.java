package kr.codesquad.core.filter;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.cors.CorsUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.util.Constants;
import kr.codesquad.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthorizationFilter implements Filter {
	private static final String[] whiteListUris = {"/h2-console/**", "/api/users", "/api/login",
		"/api/reissue-access-token", "/api/oauth/**", "/api/redirect/**", "/redirect/**", "/api/locations**",
		"/api/ws/**"};

	private final JwtProvider jwtProvider;
	private final RedisUtil redisUtil;

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
			throw new MalformedJwtException("토큰이 없습니다" + httpServletRequest.getRequestURI());
		}

		if (isBlackListed(httpServletRequest)) {
			throw new MalformedJwtException("로그아웃된 토큰입니다" + httpServletRequest.getRequestURI());
		}

		try {
			String token = getToken(httpServletRequest);
			Claims claims = jwtProvider.getClaims(token);
			request.setAttribute(Constants.LOGIN_ID, claims.get(Constants.LOGIN_ID));
			SecurityContextHolder.getContext()
				.setAuthentication(
					new UsernamePasswordAuthenticationToken(claims.getSubject(), null, new ArrayList<>()));
			chain.doFilter(request, response);
		} catch (RuntimeException e) {
			throw new MalformedJwtException("올바르지 않은 토큰입니다." + httpServletRequest.getRequestURI());
		}
	}

	private boolean isBlackListed(HttpServletRequest httpServletRequest) {
		String accessToken = getToken(httpServletRequest);
		return redisUtil.hasKey(accessToken);
	}

	private boolean whiteListCheck(String uri) {
		return PatternMatchUtils.simpleMatch(whiteListUris, uri);
	}

	private boolean isContainToken(HttpServletRequest request) {
		String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		return authorization != null && authorization.startsWith(Constants.TOKEN_PREFIX);
	}

	private String getToken(HttpServletRequest request) {
		String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		return authorization.substring(Constants.TOKEN_PREFIX.length()).replace("\"", "");
	}
}
