package kr.codesquad.auth;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import kr.codesquad.user.User;

public class CustomOAuth2User extends DefaultOAuth2User {
	private final User user;

	/**
	 * Constructs a {@code DefaultOAuth2User} using the provided parameters.
	 *
	 * @param authorities      the authorities granted to the user
	 * @param attributes       the attributes about the user
	 * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
	 *                         {@link #getAttributes()}
	 */
	public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
		Map<String, Object> attributes, String nameAttributeKey, User user) {
		super(authorities, attributes, nameAttributeKey);
		this.user = user;
	}
}
