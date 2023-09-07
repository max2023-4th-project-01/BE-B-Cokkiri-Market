package kr.codesquad.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
	private String username; // login id
	private String nickname; // unique
	private String password;
	private Long locationId;
	private String locationName;

	@Builder
	public UserSignUpRequest(String username, String nickname, String password, Long locationId, String locationName) {
		this.username = username;
		this.nickname = nickname;
		this.password = password;
		this.locationId = locationId;
		this.locationName = locationName;
	}
}
