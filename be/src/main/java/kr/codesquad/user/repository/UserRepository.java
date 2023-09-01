package kr.codesquad.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByLoginId(String loginId);

	boolean existsByLoginId(String loginId);

	boolean existsByNickName(String nickName);
}
