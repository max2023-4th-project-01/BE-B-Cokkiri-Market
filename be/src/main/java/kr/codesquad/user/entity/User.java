package kr.codesquad.user.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 200)
	private String profileImageUrl;
	@Column(nullable = false, length = 45, unique = true)
	private String loginId;
	@Column(length = 100)
	private String password;
	@Column(nullable = false, length = 45, unique = true)
	private String nickname;

	@Builder
	public User(Long id, String profileImageUrl, String loginId, String password, String nickname) {
		this.id = id;
		this.profileImageUrl = profileImageUrl;
		this.loginId = loginId;
		this.password = password;
		this.nickname = nickname;
	}
}
