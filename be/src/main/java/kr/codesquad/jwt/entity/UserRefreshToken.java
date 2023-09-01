package kr.codesquad.jwt.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class UserRefreshToken {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String userLoginId;

	private String refreshToken;

	@Builder
	public UserRefreshToken(Long id, String userLoginId, String refreshToken) {
		this.id = id;
		this.userLoginId = userLoginId;
		this.refreshToken = refreshToken;
	}
}
