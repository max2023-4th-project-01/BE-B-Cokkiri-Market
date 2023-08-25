package kr.codesquad.user;

import org.springframework.stereotype.Service;

import kr.codesquad.location.Location;
import kr.codesquad.location.LocationRepository;
import kr.codesquad.user.dto.request.UserSignUpRequest;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final LocationRepository locationRepository;

	public UserService(UserRepository userRepository, LocationRepository locationRepository) {
		this.userRepository = userRepository;
		this.locationRepository = locationRepository;
	}

	public void signUp(UserSignUpRequest userSignUpRequest, Long userId) {
		Location location = Location.builder()
			.userId(userId)
			.locationName(userSignUpRequest.getLocationName())
			.build();
		locationRepository.save(location);
		userRepository.updateNickNameAndRole(userId, userSignUpRequest.getNickName(), Role.USER);
	}
}
