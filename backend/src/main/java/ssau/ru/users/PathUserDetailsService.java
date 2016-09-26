package ssau.ru.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
public class PathUserDetailsService implements UserDetailsService {
    private final PathUserRepository userRepository;

    @Autowired
    public PathUserDetailsService(PathUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        PathUser user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        System.out.println(getAuthorities(user.getRoles()));

        return new User(user.getUsername(), user.getPassword(), getAuthorities(user.getRoles()));
    }

    private List<GrantedAuthority> getAuthorities(Collection<String> roles) {
        return AuthorityUtils.createAuthorityList(roles.toArray(new String[0]));
    }
}
