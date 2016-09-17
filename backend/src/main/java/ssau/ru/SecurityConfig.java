package ssau.ru;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/", "/vendor/**", "/img/**", "/*.js", "/*.css").permitAll()
                .anyRequest().authenticated()
                .and()
            .httpBasic()
                .and()
            .logout()
                .permitAll()
                .and()
            .csrf().disable();
    }
}
