package kr.codesquad.location;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.location.dto.LocationResponse;

@RestController
public class LocationController {

	// 외부 api 사용

	@GetMapping("/api/locations")
	public ResponseEntity<List<LocationResponse.LocationListOut>> getLocations(@RequestParam String query) {
		return ResponseEntity.ok(LocationService.getLocations(query));
	}
}
