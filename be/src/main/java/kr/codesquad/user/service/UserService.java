package kr.codesquad.user.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.image.service.AmazonS3Service;
import kr.codesquad.location.dto.request.LocationCreateRequest;
import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.dto.UserMapper;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
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
		String url;
		if (profileImageFile == null) {
			url = "https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/profileImage/%EC%BD%94%EB%81%BC%EB%A6%AC.png";
		} else {
			url = amazonS3Service.upload(profileImageFile, "profileImage");
		}
		if (userRepository.existsByLoginId(userSignUpRequest.getUsername())) {
			// TODO: 커스텀 예외 처리 필요
			throw new RuntimeException("이미 존재하는 회원입니다");
		}
		if (userRepository.existsByNickname(userSignUpRequest.getNickname())) {
			// TODO: 커스텀 예외 처리 필요
			throw new RuntimeException("이미 존재하는 닉네임입니다");
		}

		String encodedPassword = bCryptPasswordEncoder.encode(userSignUpRequest.getPassword());
		User user = userRepository.save(UserMapper.INSTANCE.toUser(userSignUpRequest, encodedPassword, url));
		locationRepository.save(Location.builder()
			.userId(user.getId())
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

	@Transactional(readOnly = true)
	public List<LocationListResponse> getLocations() {
		Long userId = 1L;
		return LocationListResponse.toLocationList(locationRepository.findAllByUserId(userId));
	}

	@Transactional
	public LocationListResponse saveLocation(LocationCreateRequest request) {
		Long userId = 1L;

		if (locationRepository.countByUserId(userId) >= 2) {
			throw new RuntimeException("동네는 최대 2개까지만 등록할 수 있습니다");
		}

		return LocationListResponse.of(locationRepository.save(Location.builder()
			.userId(userId)
			.locationName(request.getLocationName())
			.isSelected(false) // false??
			.build()));
	}

	@Transactional
	public void selectLocation(Long locationId) {
		Long userId = 1L;

		List<Location> locations = locationRepository.findAllByUserIdOrderByIsSelectedDesc(userId);

		if (locations.size() == 0) {
			throw new RuntimeException("동네는 최소 1개 이상 등록되어야 합니다");
		}

		for (Location location : locations) {
			if (location.getId().equals(locationId)) {
				location.updateIsSelected(true);
			} else {
				location.updateIsSelected(false);
			}
		}
	}

	@Transactional
	public void deleteLocation(Long locationId) {
		Long userId = 1L;

		if (locationRepository.countByUserId(userId) <= 1) {
			throw new RuntimeException("동네는 최소 1개 이상 등록되어야 합니다");
		}

		locationRepository.deleteById(locationId);
	}
}
