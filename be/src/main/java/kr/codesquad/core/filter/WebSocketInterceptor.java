package kr.codesquad.core.filter;

import java.util.ArrayList;

import javax.security.auth.message.AuthException;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.util.Constants;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {

	private final JwtProvider jwtProvider;

	@SneakyThrows
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

		if (accessor.getCommand() == StompCommand.CONNECT) {
			String authToken = accessor.getFirstNativeHeader("Authorization");

			if (authToken == null) {
				throw new MalformedJwtException("토큰이 없습니다");
			}

			try {
				// UsernamePasswordAuthenticationToken 발급
				Claims claims = jwtProvider.getClaims(authToken);
				SecurityContextHolder.getContext()
					.setAuthentication(
						new UsernamePasswordAuthenticationToken(claims.getSubject(), null, new ArrayList<>()));
			} catch (RuntimeException e) {
				throw new MalformedJwtException("토큰이 유효하지 않습니다");
			}
		}

		return message;
	}
}
