package kr.codesquad.user;

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
	@Column(nullable = false, length = 200)
	private String profileImage;
	@Column(nullable = false, length = 45)
	private String loginId;
	@Column(length = 45)
	private String nickName;
	@Column(nullable = false)
	private Role role;

	@Builder
	public User(Long id, String profileImage, String loginId, String nickName, Role role) {
		this.id = id;
		this.profileImage = profileImage;
		this.loginId = loginId;
		this.nickName = nickName;
		this.role = role;
	}
}
