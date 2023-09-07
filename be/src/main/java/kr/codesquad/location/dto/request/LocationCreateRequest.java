package kr.codesquad.location.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LocationCreateRequest {

    private Long locationId;
    private String locationName;
}
