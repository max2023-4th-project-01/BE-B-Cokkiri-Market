package kr.codesquad.auth;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import kr.codesquad.user.Role;
import kr.codesquad.user.User;
import kr.codesquad.user.UserRepository;

@Service
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final UserRepository userRepository;

	public OAuthService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth 서비스(github, google, naver)에서 가져온 유저 정보를 담고있음

		Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들
		User user = User.builder()
			.loginId((String)attributes.get("login"))
			.profileImage((String)attributes.get("avatar_url"))
			.role(Role.GUEST)
			.build();

		if (!userRepository.existsByLoginId(user.getLoginId())) {
			userRepository.save(user);
		}

		return new CustomOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(user.getRole().getValue())),
			attributes,
			"login", userRepository.findByLoginId(user.getLoginId()));
	}
}
