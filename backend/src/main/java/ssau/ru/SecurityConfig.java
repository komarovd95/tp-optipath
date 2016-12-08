package ssau.ru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;
import ssau.ru.users.PathUser;
import ssau.ru.users.PathUserDetailsService;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String[] PATHS = {
            "/", "/vendor/**", "/img/**", "/*.js", "/*.css", "/app/**", "/fonts/**",
            "/login", "/logout", "/user", "/signin", "/signup"
    };

    private final PathUserDetailsService userDetailsService;

    @Autowired
    public SecurityConfig(PathUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //.addFilterBefore(new CORSFilter(), ChannelProcessingFilter.class)
                .httpBasic().and()
                .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/signout"))
                    .permitAll().and()
                .authorizeRequests()
                    .antMatchers(PATHS).permitAll()
                    .antMatchers("/api/users/user").authenticated()
                    .antMatchers(HttpMethod.POST, "/api/users").permitAll()
                    .antMatchers(HttpMethod.GET,
                            "/api/users/search/findByUsernameExists").permitAll()
                    .antMatchers(HttpMethod.GET, "/api/pathUsers").hasRole("ADMIN")
                .anyRequest().authenticated().and()
                .csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(PathUser.PASSWORD_ENCODER);
    }

    private LogoutSuccessHandler logoutHandler() {
        return (request, response, authentication) -> {

        };
    }

    private AuthenticationFailureHandler loginFailure() {
        return (request, response, exception) -> {
            if (exception instanceof BadCredentialsException) {
                response.sendError(401, "Некорректная пара логин/пароль");
            } else {
                response.setStatus(500);
            }
        };
    }

    private Filter csrfHeaderFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request,
                                            HttpServletResponse response, FilterChain filterChain)
                    throws ServletException, IOException {
                CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class
                        .getName());
                if (csrf != null) {
                    Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
                    String token = csrf.getToken();
                    if (cookie==null || token!=null && !token.equals(cookie.getValue())) {
                        cookie = new Cookie("XSRF-TOKEN", token);
                        cookie.setPath("/");
                        response.addCookie(cookie);
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
}
