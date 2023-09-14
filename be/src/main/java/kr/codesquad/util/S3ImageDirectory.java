package kr.codesquad.util;

import java.util.Arrays;

import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FileErrorCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum S3ImageDirectory {
	// root directory 에는 파일 저장 불가. 하위 directory 안에만 파일 저장 가능

	PROFILE_IMAGE("profileImage"),
	ITEM_IMAGE("itemImage");

	private final String name;

	public static String findDirectory(String fileUrl) {
		return Arrays.stream(S3ImageDirectory.values())
			.filter(dir -> fileUrl.contains(dir.name))
			.findFirst().orElseThrow(() -> new CustomException(FileErrorCode.DIRECTROTY_NOT_FOUND)).name;
	}
}
