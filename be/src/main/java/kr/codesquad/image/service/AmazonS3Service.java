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
import com.amazonaws.services.s3.model.PutObjectRequest;

import kr.codesquad.core.error.CustomException;
import kr.codesquad.core.error.statuscode.FileErrorCode;

@Service
public class AmazonS3Service {

	@Value("${application.bucket.name}")
	private String bucketName;

	@Autowired
	private AmazonS3 amazonS3;

	@Transactional
	public String upload(MultipartFile multipartFile, String dirName) {
		File file = convertMultiPartFileToFile(multipartFile).orElseThrow(
			() -> new CustomException(FileErrorCode.FILE_UPLOAD_FAIL));
		// random file name
		String key = dirName + "/" + UUID.randomUUID() + file.getName();
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
}
