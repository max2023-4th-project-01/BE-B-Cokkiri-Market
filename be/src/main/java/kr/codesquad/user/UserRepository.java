package kr.codesquad.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByLoginId(String loginId);

	boolean existsByLoginId(String loginId);

	boolean existsByNickName(String nickName);
}
