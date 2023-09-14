package kr.codesquad;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public abstract class IntegrationTestSupport {

    static {
        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
    }

}
