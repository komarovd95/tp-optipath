package ssau.ru.users;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PathUserRepository extends PagingAndSortingRepository<PathUser, Long> {
    PathUser findByUsername(@Param("username") String username);
}
