package kr.codesquad.core.error;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import kr.codesquad.core.error.statuscode.ErrorCode;
import kr.codesquad.core.error.statuscode.StatusCode;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	// CustomException 으로 발생한 예외 처리
	@ExceptionHandler(CustomException.class)
	protected ResponseEntity<ErrorResponse> handleCustomException(CustomException ex) {
		StatusCode statusCode = ex.getStatusCode();
		log.info("CustomException handling: {}", ex.toString());
		return ResponseEntity.status(statusCode.getHttpStatus()).body(ErrorResponse.builder()
			.statusCode(statusCode.getHttpStatus())
			.message(statusCode.getMessage()).build());
	}

	// 404 PAGE_NOT_FOUND 예외
	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers,
		HttpStatus status, WebRequest request) {
		ErrorCode errorCode = ErrorCode.PAGE_NOT_FOUND;
		log.info("NoHandlerFoundException handling: {}", ex.toString());
		return ResponseEntity.status(errorCode.getHttpStatus())
			.body(ErrorResponse.builder()
				.statusCode(errorCode.getHttpStatus())
				.message(errorCode.getMessage())
				.detail(ex.getMessage() + ", " + NestedExceptionUtils.getMostSpecificCause(ex)).build());
	}

	// 500 에러
	// 데이터 베이스 오류
	@ExceptionHandler(DataAccessException.class)
	protected ResponseEntity<ErrorResponse> handleDataAccessException(DataAccessException ex) {
		ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR_DB;
		// log.warn("DataAccessException handling: {}", ex.toString());
		log.error("DataAccessException: ", ex);
		return ResponseEntity.status(errorCode.getHttpStatus())
			.body(ErrorResponse.builder()
				.statusCode(errorCode.getHttpStatus())
				.message(errorCode.getMessage())
				.detail(ex.getMessage() + ", " + ex.getMostSpecificCause()).build());
	}

	// 서버 오류
	@ExceptionHandler(Exception.class)
	protected ResponseEntity<ErrorResponse> handleException(Exception ex) {
		ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
		// log.warn("Exception handling: {}", ex.toString());
		log.error("Exception: ", ex);
		return ResponseEntity.status(errorCode.getHttpStatus())
			.body(ErrorResponse.builder()
				.statusCode(errorCode.getHttpStatus())
				.message(errorCode.getMessage())
				.detail(ex.getMessage() + ", " + NestedExceptionUtils.getMostSpecificCause(ex)).build());
	}

	// @Valid 예외 처리
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
		HttpHeaders headers, HttpStatus status, WebRequest request) {
		ErrorCode errorCode = ErrorCode.VALIDATION_FAILED;
		log.info("MethodArgumentNotValidException handling: {}", ex.getMessage());
		return ResponseEntity.status(errorCode.getHttpStatus())
			.body(ErrorResponse.builder()
				.statusCode(errorCode.getHttpStatus())
				.message(errorCode.getMessage())
				.detail(ex.getMessage() + ", " + NestedExceptionUtils.getMostSpecificCause(ex)).build());
	}
}
