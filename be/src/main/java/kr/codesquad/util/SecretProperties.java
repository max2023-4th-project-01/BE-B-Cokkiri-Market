package kr.codesquad.util;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConstructorBinding
@ConfigurationProperties("secret.api")
public class SecretProperties {

    private Vworld vworld;
    private Openai openai;

    @Getter
    @Setter
    public static class Vworld {
        private String endpoint;
        private String key;
        private String domain;
    }

    @Getter
    @Setter
    public static class Openai {
        private String endpoint;
        private String key;
        private String prompt;
    }
}
