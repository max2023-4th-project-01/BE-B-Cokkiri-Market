package kr.codesquad.config;

import javax.servlet.Filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.common.AuthorizationFilter;
import kr.codesquad.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {
	private final JwtProvider jwtProvider;

	@Bean
	public FilterRegistrationBean<Filter> jwtAuthorizationFilter(ObjectMapper mapper) {
		FilterRegistrationBean<Filter> filterRegistrationBean = new
			FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(new AuthorizationFilter(mapper, jwtProvider));
		filterRegistrationBean.setOrder(1);
		return filterRegistrationBean;
	}
}
