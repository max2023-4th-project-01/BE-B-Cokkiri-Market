package kr.codesquad.location.dto;

import java.util.List;
import java.util.Map;

import kr.codesquad.location.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class LocationResponse {

	@Getter
	@AllArgsConstructor
	public static class myLocationOut {
		private Long id;
		private String name;
		private Boolean isSelected;

		public static List<myLocationOut> toLocationOutList(List<Location> locations) {

			return locations.stream()
				.map(location -> new myLocationOut(location.getId(), location.getLocationName(), location.getIsSelected()))
				.toList();
		}
	}

	@Getter
	@AllArgsConstructor
	public static class LocationListOut {
		private Long id;
		private String name;
	}
}
