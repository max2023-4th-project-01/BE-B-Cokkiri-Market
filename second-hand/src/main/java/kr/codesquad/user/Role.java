package kr.codesquad.user;

import lombok.Getter;

@Getter
public enum Role {
	GUEST("GUEST"), USER("USER");

	private final String value;

	Role(String value) {
		this.value = value;
	}
}
