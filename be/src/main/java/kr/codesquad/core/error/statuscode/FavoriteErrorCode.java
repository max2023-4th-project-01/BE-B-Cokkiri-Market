package kr.codesquad.core.error.statuscode;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum FavoriteErrorCode implements StatusCode {
	FAVORITE_ADD_FAILED(HttpStatus.BAD_REQUEST, "이미 좋아요 한 게시물 입니다."),
	FAVORITE_DELETE_FAILED(HttpStatus.BAD_REQUEST, "이미 좋아요 취소 된 게시물 입니다.");

	private final HttpStatus httpStatus;
	private final String message;

	@Override
	public String getName() {
		return name();
	}

	@Override
	public HttpStatus getHttpStatus() {
		return this.httpStatus;
	}

	@Override
	public String getMessage() {
		return this.message;
	}
}
