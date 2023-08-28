package kr.codesquad.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
	private String username;
	private String password;
	private String nickName;
	private String locationName;

	@Builder
	public UserSignUpRequest(String username, String password, String nickName, String locationName) {
		this.username = username;
		this.password = password;
		this.nickName = nickName;
		this.locationName = locationName;
	}
}
