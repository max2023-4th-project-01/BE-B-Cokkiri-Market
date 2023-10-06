package kr.codesquad.core.filter;

import java.util.ArrayList;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketInterceptor implements ChannelInterceptor {

	private final JwtProvider jwtProvider;

	@SneakyThrows
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

		if (accessor.getCommand() == StompCommand.CONNECT) {
			String authToken = getToken(accessor.getFirstNativeHeader("Authorization"));

			if (authToken == null) {
				throw new MalformedJwtException("토큰이 없습니다");
			}

			try {
				// UsernamePasswordAuthenticationToken 발급
				Claims claims = jwtProvider.getClaims(authToken);
				String loginId = (String)claims.get(Constants.LOGIN_ID);
				SecurityContextHolder.getContext()
					.setAuthentication(
						new UsernamePasswordAuthenticationToken(loginId, null, new ArrayList<>()));
			} catch (RuntimeException e) {
				throw new MalformedJwtException("토큰이 유효하지 않습니다");
			}
		}

		return message;
	}

	private String getToken(String token) {
		return token.substring(Constants.TOKEN_PREFIX.length()).replace("\"", "");
	}
}
