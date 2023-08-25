package kr.codesquad.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByLoginId(String loginId);

	boolean existsByLoginId(String loginId);

	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.nickName = :nickName, u.role = :role WHERE u.id = :id")
	int updateNickNameAndRole(Long id, String nickName, Role role);
}
