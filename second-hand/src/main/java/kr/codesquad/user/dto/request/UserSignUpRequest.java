package kr.codesquad.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
	private String nickName;
	private String locationName;

	@Builder
	public UserSignUpRequest(String nickName, String locationName) {
		this.nickName = nickName;
		this.locationName = locationName;
	}
}
