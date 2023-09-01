package kr.codesquad.location.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import kr.codesquad.location.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LocationListResponse {
    private Long id;
    private String name;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean isSelected;

    public static List<LocationListResponse> toLocationList(List<Location> locations) {

        return locations.stream()
                .map(location -> new LocationListResponse(location.getId(), location.getLocationName(), location.getIsSelected()))
                .collect(java.util.stream.Collectors.toList());
    }

    public static LocationListResponse of(Location location) {
        return new LocationListResponse(location.getId(), location.getLocationName(), location.getIsSelected());
    }
}
