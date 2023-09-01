package kr.codesquad.auth.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.UuidGenerator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final static String GITHUB_ID = "id";
	private final static String GITHUB_PROFILE_URL = "avatar_url";
	private final static String GITHUB_LOGIN_ID = "login";
	private final UserRepository userRepository;
	private final LocationRepository locationRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth 서비스(github, google, naver)에서 가져온 유저 정보를 담고있음

		Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들
		Integer id = (Integer)attributes.get(GITHUB_ID);
		User user = User.builder()
			.loginId(id.toString())
			.profileImage((String)attributes.get(GITHUB_PROFILE_URL))
			.nickName(generateNickName((String)attributes.get(GITHUB_LOGIN_ID)))
			.build();

		if (!userRepository.existsByLoginId(user.getLoginId())) {
			User savedUser = userRepository.save(user);
			// TODO: 기본 동네 반환 메소드 구현 필요
			locationRepository.save(Location.builder()
				.userId(savedUser.getId())
				.locationName("기본동네")
				.build());
		}

		return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("no_role"))
			, attributes, GITHUB_ID);
	}

	private String generateNickName(String loginId) {
		String nickName = loginId + UuidGenerator.generateUuid();
		while (userRepository.existsByNickName(nickName)) {
			nickName = loginId + UuidGenerator.generateUuid();
		}
		return nickName;
	}
}
