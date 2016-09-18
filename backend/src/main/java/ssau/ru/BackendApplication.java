package ssau.ru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ssau.ru.users.PathUser;
import ssau.ru.users.PathUserRepository;

import java.util.Collections;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Autowired
    public BackendApplication(PathUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	private final PathUserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {
		userRepository.save(new PathUser("diman", "diman", Collections.singleton("ROLE_USER")));
	}
}
