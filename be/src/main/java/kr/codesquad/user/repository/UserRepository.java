package kr.codesquad.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import kr.codesquad.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByLoginId(String loginId);

	boolean existsByLoginId(String loginId);

	boolean existsByNickname(String nickname);

	@Query("select u.id from User u where u.loginId = :loginId")
	Long findIdByLoginId(String loginId);
}
