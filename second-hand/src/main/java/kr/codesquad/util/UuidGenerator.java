package kr.codesquad.util;

import java.util.UUID;

public class UuidGenerator {
	private static final Integer DEFAULT_LENGTH = 8;

	public static String generateUuid() {
		UUID uuid = UUID.randomUUID();
		String uuidStr = uuid.toString().replace("-", "");
		int endIndex = Math.min(DEFAULT_LENGTH, uuidStr.length());
		return uuidStr.substring(0, endIndex);
	}
}
