package kr.codesquad;

import kr.codesquad.util.TimeStamped;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.ZonedDateTime;
import java.util.Optional;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableJpaAuditing(dateTimeProviderRef = "zonedDateTimeProvider")
public class SecondHandApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecondHandApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

  @Bean
	public DateTimeProvider zonedDateTimeProvider(){
		return () -> Optional.of(ZonedDateTime.now(TimeStamped.SEOUL_ZONE_ID));
	}
}
