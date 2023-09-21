package kr.codesquad.user.service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.image.service.AmazonS3Service;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.dto.UserMapper;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.dto.response.UpdateProfileImageResponse;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.Constants;
import kr.codesquad.util.S3ImageDirectory;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final UserRepository userRepository;
	private final LocationRepository locationRepository;
	private final AmazonS3Service amazonS3Service;

	@Transactional
	public void signUp(UserSignUpRequest userSignUpRequest, MultipartFile profileImageFile) {
		if (userRepository.existsByLoginId(userSignUpRequest.getUsername())) {
			// TODO: 커스텀 예외 처리 필요
			throw new RuntimeException("이미 존재하는 회원입니다");
		}
		if (userRepository.existsByNickname(userSignUpRequest.getNickname())) {
			// TODO: 커스텀 예외 처리 필요
			throw new RuntimeException("이미 존재하는 닉네임입니다");
		}
		String url;
		if (profileImageFile == null) {
			url = Constants.DEFAULT_PROFILE_IMAGE_URL;
		} else {
			url = amazonS3Service.upload(profileImageFile, S3ImageDirectory.PROFILE_IMAGE);
		}

		String encodedPassword = bCryptPasswordEncoder.encode(userSignUpRequest.getPassword());
		User user = userRepository.save(UserMapper.INSTANCE.toUser(userSignUpRequest, encodedPassword, url));
		locationRepository.save(Location.builder()
			.userId(user.getId())
			.locationId(userSignUpRequest.getLocationId())
			.locationName(userSignUpRequest.getLocationName())
			.isSelected(true)
			.build());
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByLoginId(username);
		return new org.springframework.security.core.userdetails.User(username, user.getPassword(),
			new ArrayList<>());
	}

	@Transactional
	public UpdateProfileImageResponse updateProfileImage(MultipartFile profileImageFile, String userLoginId) {
		User user = userRepository.findByLoginId(userLoginId);
		amazonS3Service.deleteImage(user.getProfileImageUrl()); // 기존 프로필 이미지 삭제

		String newProfileImageUrl = Constants.DEFAULT_PROFILE_IMAGE_URL;
		if (profileImageFile != null) {
			newProfileImageUrl = amazonS3Service.upload(profileImageFile, S3ImageDirectory.PROFILE_IMAGE);
		}
		user.updateProfileImage(newProfileImageUrl);

		return new UpdateProfileImageResponse(newProfileImageUrl);
	}
}
