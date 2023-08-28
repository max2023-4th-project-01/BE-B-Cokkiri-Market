package kr.codesquad.user;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.location.Location;
import kr.codesquad.location.LocationRepository;
import kr.codesquad.user.dto.UserMapper;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final UserRepository userRepository;
	private final LocationRepository locationRepository;

	@Transactional
	public void signUp(UserSignUpRequest userSignUpRequest) {
		String encodedPassword = bCryptPasswordEncoder.encode(userSignUpRequest.getPassword());
		User user = userRepository.save(UserMapper.INSTANCE.toUser(userSignUpRequest, encodedPassword));
		locationRepository.save(Location.builder()
			.userId(user.getId())
			.locationName(userSignUpRequest.getLocationName())
			.build());
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByLoginId(username);
		return new org.springframework.security.core.userdetails.User(username, user.getPassword(),
			new ArrayList<>());
	}
}
