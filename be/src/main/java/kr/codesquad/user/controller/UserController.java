package kr.codesquad.user.controller;

import kr.codesquad.location.dto.request.LocationCreateRequest;
import kr.codesquad.location.dto.response.LocationListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

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
	public ResponseEntity<List<LocationListResponse>> getLocations() {
		return ResponseEntity.ok(userService.getLocations());
	}

	@PostMapping("locations")
	public ResponseEntity<LocationListResponse> createLocation(@RequestBody LocationCreateRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveLocation(request));
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
