package kr.codesquad.location;

import java.util.List;

import kr.codesquad.location.dto.response.LocationListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

	// 외부 api 사용

	@GetMapping("/api/locations")
	public ResponseEntity<List<LocationListResponse>> getLocations(@RequestParam String query) {
		return ResponseEntity.ok(LocationService.getLocations(query));
	}
}
