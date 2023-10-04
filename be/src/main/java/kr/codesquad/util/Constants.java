package kr.codesquad.util;

public final class Constants {
	public static final String LOGIN_ID = "loginId";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String REFRESH_TOKEN = "Refresh-Token";
	public static final String DEFAULT_PROFILE_IMAGE_URL =
		"https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/" + S3ImageDirectory.PROFILE_IMAGE.getDirName()
			+ "/%E1%84%8F%E1%85%A9%E1%84%81%E1%85%B5%E1%84%85%E1%85%B5.png";
}
