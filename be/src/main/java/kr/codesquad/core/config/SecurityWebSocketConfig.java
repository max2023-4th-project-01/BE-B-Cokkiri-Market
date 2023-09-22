package kr.codesquad.core.config;

import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

public class SecurityWebSocketConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {

	@Override
	protected void configureInbound(MessageSecurityMetadataSourceRegistry message) {
		message
			.nullDestMatcher().permitAll()
			.simpDestMatchers("/api/ws/pub/**").authenticated()
			.simpSubscribeDestMatchers("/api/ws/sub/**").authenticated()
			.anyMessage().denyAll();
	}

	@Override
	protected boolean sameOriginDisabled() {
		// CSRF 비활성화
		return true;
	}
}
