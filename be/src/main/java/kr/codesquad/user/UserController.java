package kr.codesquad.user;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.location.Location;
import kr.codesquad.location.dto.LocationRequest;
import kr.codesquad.location.dto.LocationResponse;
import kr.codesquad.user.dto.request.UserSignUpRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserService userService;

	@PostMapping()
	public void signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
		userService.signUp(userSignUpRequest);
	}

	@GetMapping("locations")
	public ResponseEntity<List<LocationResponse.myLocationOut>> getLocations() {
		return ResponseEntity.ok(userService.getLocations());
	}

	@PostMapping("locations")
	public ResponseEntity<Void> createLocation(@RequestBody LocationRequest.LocationAddIn request) {
		userService.saveLocation(request);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PatchMapping("locations/{locationId}")
	public ResponseEntity<Void> updateLocation(@PathVariable Long locationId) {
		userService.selectLocation(locationId);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("locations/{locationId}")
	public ResponseEntity<Void> deleteLocation(@PathVariable Long locationId) {
		userService.deleteLocation(locationId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
