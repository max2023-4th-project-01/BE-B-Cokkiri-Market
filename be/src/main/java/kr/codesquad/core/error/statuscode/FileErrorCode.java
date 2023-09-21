package kr.codesquad.core.error.statuscode;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum FileErrorCode implements StatusCode {
	FILE_UPLOAD_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다."),
	MULTIFILE_CONVERT_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "멀티 파일 변환에 실패했습니다."),
	DIRECTROTY_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "파일에 해당하는 디렉토리를 찾을 수 없습니다.");

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
