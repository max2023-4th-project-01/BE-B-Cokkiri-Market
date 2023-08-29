package kr.codesquad.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserResponse {
	private String loginId;
	private String profileImage;

	@Builder
	public UserResponse(String loginId, String profileImage) {
		this.loginId = loginId;
		this.profileImage = profileImage;
	}
}
