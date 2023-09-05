package kr.codesquad.core.error.statuscode;

import org.springframework.http.HttpStatus;

public interface StatusCode {
	String getName();

	HttpStatus getHttpStatus();

	String getMessage();
}
