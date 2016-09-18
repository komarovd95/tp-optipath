package ssau.ru.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserPrincipalController {
    private final PathUserRepository userRepository;

    @Autowired
    public UserPrincipalController(PathUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping("/user")
    public PathUser principal(Principal user) {
        return userRepository.findByUsername(user.getName());
    }
}
