package kr.codesquad.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import kr.codesquad.auth.service.OAuthService;
import kr.codesquad.core.filter.AuthenticationFilter;
import kr.codesquad.core.filter.AuthorizationFilter;
import kr.codesquad.jwt.service.JwtAuthenticationSuccessHandler;
import kr.codesquad.jwt.service.JwtProvider;
import kr.codesquad.user.service.UserService;
import kr.codesquad.util.Constants;
import kr.codesquad.util.RedisUtil;
import lombok.RequiredArgsConstructor;

@EnableWebSecurity // spring security 설정을 활성화시켜주는 어노테이션
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final UserService userService;
	private final RedisUtil redisUtil;
	private final PasswordEncoder passwordEncoder;
	private final OAuthService oAuthService;
	private final JwtAuthenticationSuccessHandler jwtAuthenticationSuccessHandler;
	private final JwtProvider jwtProvider;

	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(
			AuthenticationManagerBuilder.class);

		authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder);
		AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

		AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager);
		authenticationFilter.setAuthenticationSuccessHandler(jwtAuthenticationSuccessHandler);
		authenticationFilter.setFilterProcessesUrl("/api/login");

		AuthorizationFilter authorizationFilter = new AuthorizationFilter(jwtProvider, redisUtil);

		http.csrf()
			.disable()
			.headers()
			.frameOptions()
			.disable()
			.and()
			.cors().configurationSource(configurationSource())
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.antMatchers("/h2-console/**", "/api/locations**", "/api/ws/**").permitAll()
			.antMatchers(HttpMethod.POST, "/api/users").permitAll()
			.anyRequest()
			.authenticated()  //다른 요청은 인증 필요함
			.and()
			.oauth2Login()
			.successHandler(jwtAuthenticationSuccessHandler)// OAuth2 로그인 설정 시작점
			.userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
			.userService(oAuthService); // OAuth2 로그인 성공 시, 후작업을 진행할 UserService 인터페이스 구현체 등

		http.formLogin()
			.disable()
			.httpBasic()
			.disable()
			.authenticationManager(authenticationManager)
			.addFilterAfter(authenticationFilter, LogoutFilter.class)
			.addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	public CorsConfigurationSource configurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*"); // GET, POST, PUT, DELETE (Javascript 요청 허용)
		configuration.addAllowedOriginPattern("*"); // 모든 IP 주소 허용 (프론트 앤드 IP만 허용 react)
		configuration.setAllowCredentials(true); // 클라이언트에서 쿠키 요청 허용
		configuration.addExposedHeader(HttpHeaders.AUTHORIZATION);// 옛날에는 디폴트 였다. 지금은 아닙니다.
		configuration.addExposedHeader(Constants.REFRESH_TOKEN);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
