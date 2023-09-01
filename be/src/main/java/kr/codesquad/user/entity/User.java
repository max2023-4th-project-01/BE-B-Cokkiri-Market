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
	private String profileImage;
	@Column(nullable = false, length = 45, unique = true)
	private String loginId;
	@Column(length = 100)
	private String password;
	@Column(nullable = false, length = 45, unique = true)
	private String nickName;

	@Builder
	public User(Long id, String profileImage, String loginId, String password, String nickName) {
		this.id = id;
		this.profileImage = profileImage;
		this.loginId = loginId;
		this.password = password;
		this.nickName = nickName;
	}
}
