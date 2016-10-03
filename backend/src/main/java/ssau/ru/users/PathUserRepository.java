package ssau.ru.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface PathUserRepository extends PagingAndSortingRepository<PathUser, Long>,
        JpaSpecificationExecutor<PathUser> {
    PathUser findByUsername(@Param("username") String username);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN 'true' ELSE 'false' END " +
            "FROM PathUser u WHERE u.username = ?1")
    boolean existsUsername(@Param("username") String username);

    Page<PathUser> findAllByUsernameContaining(@Param("username") String username,
                                               Pageable pageable);
}
