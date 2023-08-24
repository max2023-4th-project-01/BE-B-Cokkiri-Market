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
	private String login_id;
	@Column(nullable = false, length = 100)
	private String password;

	@Builder
	public User(Long id, String profileImage, String login_id, String password) {
		this.id = id;
		this.profileImage = profileImage;
		this.login_id = login_id;
		this.password = password;
	}
}
