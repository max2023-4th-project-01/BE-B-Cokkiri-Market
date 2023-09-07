package kr.codesquad.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
	private String username;
	private String nickname;
	private String password;
	private String locationName;
	private Long locationId;

	@Builder
	public UserSignUpRequest(String username, String nickname, String password, String locationName, Long locationId) {
		this.username = username;
		this.nickname = nickname;
		this.password = password;
		this.locationName = locationName;
		this.locationId = locationId;
	}
}
