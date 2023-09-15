package kr.codesquad.image.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;

import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FileErrorCode;
import kr.codesquad.util.S3ImageDirectory;

@Service
public class AmazonS3Service {

	@Value("${application.bucket.name}")
	private String bucketName;

	@Autowired
	private AmazonS3 amazonS3;

	private static final String DEFAULT_PROFILE_IMAGE =
		S3ImageDirectory.PROFILE_IMAGE.name() + "/" + "%EC%BD%94%EB%81%BC%EB%A6%AC.png"; // "코끼리.png"

	@Transactional
	public String upload(MultipartFile multipartFile, S3ImageDirectory s3ImageDirectory) {
		File file = convertMultiPartFileToFile(multipartFile).orElseThrow(
			() -> new CustomException(FileErrorCode.FILE_UPLOAD_FAIL));
		// random file name
		String key = s3ImageDirectory.getDirName() + "/" + UUID.randomUUID() + file.getName();
		// put S3
		amazonS3.putObject(new PutObjectRequest(bucketName, key, file).withCannedAcl(
			CannedAccessControlList.PublicRead));
		// get S3
		String path = amazonS3.getUrl(bucketName, key).toString();
		// delete object
		file.delete();

		return path;
	}

	private Optional<File> convertMultiPartFileToFile(MultipartFile file) {
		File convertedFile = new File(file.getOriginalFilename());
		try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
			fos.write(file.getBytes());
		} catch (IOException e) {
			throw new CustomException(FileErrorCode.MULTIFILE_CONVERT_FAIL);
		}
		return Optional.of(convertedFile);
	}

	public void deleteImage(String fileUrl) {
		String dirPath = S3ImageDirectory.findDirectory(fileUrl) + "/";
		String fileName = fileUrl.substring(fileUrl.indexOf(dirPath) + dirPath.length());
		String key = dirPath + fileName;

		if (!DEFAULT_PROFILE_IMAGE.equals(key)) { // 기본 프로필 이미지가 아닌 경우에만 S3에서 삭제
			amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
		}
	}
}
