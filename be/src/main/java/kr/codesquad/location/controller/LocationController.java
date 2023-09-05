package kr.codesquad.location.controller;

import java.util.List;
import java.util.Map;

import kr.codesquad.location.dto.request.LocationCreateRequest;
import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LocationController {

    private static final String LOGIN_ID = "login_id";
    private final LocationService locationService;

    @GetMapping("/locations")
    public ResponseEntity<Map<String, List<LocationListResponse>>> getLocations(@RequestParam String query) {
        return ResponseEntity.ok(Map.of("locations", locationService.getLocations(query)));
    }

    @GetMapping("/users/locations")
    public ResponseEntity<List<LocationListResponse>> getMyLocations(HttpServletRequest request) {
        String userLoginId = (String) request.getAttribute(LOGIN_ID);
        return ResponseEntity.ok(locationService.getMyLocations(userLoginId));
    }

    @PostMapping("/users/locations")
    public ResponseEntity<LocationListResponse> createLocation(@RequestBody LocationCreateRequest requestDto, HttpServletRequest request) {
        String userLoginId = (String) request.getAttribute(LOGIN_ID);
        return ResponseEntity.status(HttpStatus.CREATED).body(locationService.saveLocation(requestDto, userLoginId));
    }

    @PatchMapping("/users/locations/{locationId}")
    public ResponseEntity<Void> updateLocation(@PathVariable Long locationId, HttpServletRequest request) {
        String userLoginId = (String) request.getAttribute(LOGIN_ID);
        locationService.selectLocation(locationId, userLoginId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/locations/{locationId}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long locationId, HttpServletRequest request) {
        String userLoginId = (String) request.getAttribute(LOGIN_ID);
        locationService.deleteLocation(locationId, userLoginId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
