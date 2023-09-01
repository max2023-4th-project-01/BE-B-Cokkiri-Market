package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.user.service.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {
	@Autowired
	UserService userService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	LocationRepository locationRepository;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@DisplayName("회원가입 시 회원저장을 하고 동네도 함께 저장을 한다.")
	@Test
	void signupTest() {
		// given
		String loginId = "loginId";
		String password = "password";
		String locationName = "locationName";

		UserSignUpRequest userSignUpRequest = UserSignUpRequest.builder()
			.username(loginId)
			.password(password)
			.locationName(locationName)
			.build();

		// when
		userService.signUp(userSignUpRequest);

		// then
		User user = userRepository.findByLoginId(loginId);
		assertThat(user.getLoginId()).isEqualTo(loginId);
		assertThat(user.getPassword()).isEqualTo(bCryptPasswordEncoder.encode(password));

		Location location = locationRepository.findByUserId(user.getId());
		assertThat(location.getLocationName()).isEqualTo(locationName);
	}

	@DisplayName("회원가입 시 중복 로그인 아이디면 예외를 반환한다.")
	@Test
	void signupFailTest() {
		// given
		String loginId = "loginId";
		String password = "password";
		String locationName = "locationName";

		UserSignUpRequest userSignUpRequest = UserSignUpRequest.builder()
			.username(loginId)
			.password(password)
			.locationName(locationName)
			.build();
		userService.signUp(userSignUpRequest);

		// when && then
		RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.signUp(userSignUpRequest));
		assertThat(exception.getMessage()).isEqualTo("이미 존재하는 회원입니다");
	}

}
