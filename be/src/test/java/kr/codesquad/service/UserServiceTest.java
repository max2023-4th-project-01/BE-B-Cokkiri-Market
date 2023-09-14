package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.user.service.UserService;

public class UserServiceTest extends IntegrationTestSupport {
	@Autowired
	UserService userService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	LocationRepository locationRepository;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@AfterEach
	void dbClean() {
		userRepository.deleteAllInBatch();
		locationRepository.deleteAllInBatch();
	}

	@DisplayName("회원가입 시 회원저장을 하고 동네도 함께 저장을 한다.")
	@Test
	void signupTest() {
		// given
		String loginId = "loginId";
		String password = "password";
		Long locationId = 1234L;
		String locationName = "locationName";
		String nickname = "nickname";
		byte[] content = "This is dummy file content".getBytes();
		MultipartFile multipartFile = new MockMultipartFile("dummyFile.txt", content);
		String profileImageUrl = "profileImageUrl";
		UserSignUpRequest userSignUpRequest = UserSignUpRequest.builder()
			.username(loginId)
			.password(password)
			.locationId(locationId)
			.locationName(locationName)
			.nickname(nickname)
			.build();

		when(amazonS3Service.upload(any(MultipartFile.class), any())).thenReturn(profileImageUrl);

		// when
		userService.signUp(userSignUpRequest, multipartFile);

		// then
		User user = userRepository.findByLoginId(loginId);
		assertThat(user.getLoginId()).isEqualTo(loginId);

		Location location = locationRepository.findByUserId(user.getId());
		assertThat(location.getLocationName()).isEqualTo(locationName);
	}

	@DisplayName("회원가입 시 중복 로그인 아이디면 예외를 반환한다.")
	@Test
	void signupFailTest() {
		// given
		String loginId = "loginId";
		String password = "password";
		String nickname = "nickname";
		Long locationId = 1234L;
		String locationName = "locationName";
		byte[] content = "This is dummy file content".getBytes();
		MultipartFile multipartFile = new MockMultipartFile("dummyFile.txt", content);

		UserSignUpRequest userSignUpRequest = UserSignUpRequest.builder()
			.username(loginId)
			.password(password)
			.nickname(nickname)
			.locationId(locationId)
			.locationName(locationName)
			.build();
		userService.signUp(userSignUpRequest, multipartFile);

		// when && then
		RuntimeException exception = assertThrows(RuntimeException.class,
			() -> userService.signUp(userSignUpRequest, multipartFile));
		assertThat(exception.getMessage()).isEqualTo("이미 존재하는 회원입니다");
	}

	@DisplayName("회원가입 시 중복 닉네임이면 예외를 반환한다.")
	@Test
	void signupFailByNicknameTest() {
		// given
		String loginId1 = "loginId1";
		String loginId2 = "loginId2";
		String nickname = "nickname";
		String password = "password";
		Long locationId = 1234L;
		String locationName = "locationName";
		byte[] content = "This is dummy file content".getBytes();
		MultipartFile multipartFile = new MockMultipartFile("dummyFile.txt", content);

		UserSignUpRequest userSignUpRequest = UserSignUpRequest.builder()
			.username(loginId1)
			.password(password)
			.nickname(nickname)
			.locationId(locationId)
			.locationName(locationName)
			.build();
		userService.signUp(userSignUpRequest, multipartFile);
		UserSignUpRequest userSignUpRequest2 = UserSignUpRequest.builder()
			.username(loginId2)
			.password(password)
			.nickname(nickname)
			.locationName(locationName)
			.build();

		// when && then
		RuntimeException exception = assertThrows(RuntimeException.class,
			() -> userService.signUp(userSignUpRequest2, multipartFile));
		assertThat(exception.getMessage()).isEqualTo("이미 존재하는 닉네임입니다");
	}

}
