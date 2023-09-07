package kr.codesquad.core.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.cors.CorsUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthorizationFilter implements Filter {
	private static final String[] whiteListUris = {"/h2-console/**", "/api/users", "/api/login",
		"/api/reissue-access-token", "/api/oauth/**", "/api/redirect/**", "/login/oauth2/code/github**",
		"/api/locations**", "/favicon**"};

	private final JwtProvider jwtProvider;

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
			response.setCharacterEncoding("UTF-8");
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			((HttpServletResponse)response).setStatus(HttpStatus.BAD_REQUEST.value());

			// Get the request URL
			String requestURL = httpServletRequest.getRequestURL().toString();

			// Create a JSON response object that includes the request URL
			Map<String, Object> jsonResponse = new HashMap<>();
			jsonResponse.put("error", "MalformedJwtException");
			jsonResponse.put("message", "");
			jsonResponse.put("requestUrl", requestURL);
			jsonResponse.put("/login/oauth2/code/github**",
				PatternMatchUtils.simpleMatch("/login/oauth2/code/github**", requestURL));

			// Convert the JSON response to a string
			String jsonResponseString = new ObjectMapper().writeValueAsString(jsonResponse);

			// Write the JSON response to the output stream
			response.getWriter().write(jsonResponseString);
			throw new MalformedJwtException("");

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
			response.setCharacterEncoding("UTF-8");
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			((HttpServletResponse)response).setStatus(HttpStatus.UNAUTHORIZED.value());
			throw new MalformedJwtException("");
		}
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
		return authorization.substring(7).replace("\"", "");
	}
}
