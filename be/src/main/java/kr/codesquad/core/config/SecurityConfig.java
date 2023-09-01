package kr.codesquad.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

import kr.codesquad.core.auth.OAuthService;
import kr.codesquad.core.filter.AuthenticationFilter;
import kr.codesquad.core.filter.AuthorizationFilter;
import kr.codesquad.core.jwt.service.JwtAuthenticationSuccessHandler;
import kr.codesquad.core.jwt.service.JwtProvider;
import kr.codesquad.user.UserService;
import lombok.RequiredArgsConstructor;

@EnableWebSecurity // spring security 설정을 활성화시켜주는 어노테이션
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final UserService userService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final OAuthService oAuthService;
	private final JwtAuthenticationSuccessHandler jwtAuthenticationSuccessHandler;
	private final JwtProvider jwtProvider;

	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(
			AuthenticationManagerBuilder.class);

		authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
		AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

		AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager);
		authenticationFilter.setAuthenticationSuccessHandler(jwtAuthenticationSuccessHandler);
		authenticationFilter.setFilterProcessesUrl("/api/login");

		AuthorizationFilter authorizationFilter = new AuthorizationFilter(jwtProvider);

		http.csrf()
			.disable()
			.headers()
			.frameOptions()
			.disable()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.antMatchers("/h2-console/**").permitAll()
			.antMatchers(HttpMethod.POST, "/api/users").permitAll()
			.antMatchers("/**").permitAll()
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

}
