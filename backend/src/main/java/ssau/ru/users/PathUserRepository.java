package ssau.ru.users;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PathUserRepository extends CrudRepository<PathUser, Long> {
    PathUser findByUsername(String username);
}
