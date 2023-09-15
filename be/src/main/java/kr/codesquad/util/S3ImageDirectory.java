package kr.codesquad.util;

import java.util.Arrays;

import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FileErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum S3ImageDirectory {
	// root directory 에는 파일 저장 불가. 하위 directory 안에만 파일 저장 가능

	PROFILE_IMAGE("profileImage"),
	ITEM_IMAGE("itemImage");

	private final String dirName;

	public static String findDirectory(String fileUrl) {
		return Arrays.stream(S3ImageDirectory.values())
			.filter(dir -> fileUrl.contains(dir.dirName))
			.findFirst().orElseThrow(() -> new CustomException(FileErrorCode.DIRECTROTY_NOT_FOUND)).dirName;
	}
}
