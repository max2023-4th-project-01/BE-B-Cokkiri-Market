package kr.codesquad.location.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

    @GetMapping("/api/locations")
    public ResponseEntity<List<LocationListResponse>> getLocations(@RequestParam String query) {
        return ResponseEntity.ok(LocationService.getLocations(query));
    }
}
