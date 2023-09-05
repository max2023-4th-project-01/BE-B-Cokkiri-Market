package kr.codesquad.location.controller;

import java.util.List;
import java.util.Map;

import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/api/locations")
    public ResponseEntity<Map<String, List<LocationListResponse>>> getLocations(@RequestParam String query) {
        return ResponseEntity.ok(Map.of("locations", locationService.getLocations(query)));
    }
}
