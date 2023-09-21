package kr.codesquad;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import kr.codesquad.image.service.AmazonS3Service;

@ActiveProfiles({"dev", "oauth", "cloud"})
@SpringBootTest
public abstract class IntegrationTestSupport {
	@MockBean
	protected AmazonS3Service amazonS3Service;
}
