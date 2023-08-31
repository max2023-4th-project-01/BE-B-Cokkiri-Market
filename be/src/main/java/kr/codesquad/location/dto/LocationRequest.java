package kr.codesquad.location.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class LocationRequest {

	@Getter
	@RequiredArgsConstructor
	public static class LocationAddIn {

		private String locationName;
	}
}
