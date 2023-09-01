package kr.codesquad.user.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import kr.codesquad.user.dto.request.UserSignUpRequest;
import kr.codesquad.user.entity.User;

@Mapper
public interface UserMapper {
	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	@Mapping(target = "password", source = "encodedPassword")
	@Mapping(target = "loginId", source = "userSignUpRequest.username")
	User toUser(UserSignUpRequest userSignUpRequest, String encodedPassword, String nickName);
}
