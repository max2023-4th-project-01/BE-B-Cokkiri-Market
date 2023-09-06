package kr.codesquad.core.error;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ErrorResponse {
	// ResponseEntity의 body에 담기 위해 사용
	private int statusCode;
	private String message;
	private String detail;

	@Builder
	public ErrorResponse(HttpStatus statusCode, String message, String detail) {
		this.statusCode = statusCode.value();
		this.message = message;
		this.detail = detail;
	}
}
