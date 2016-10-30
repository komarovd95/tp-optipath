package ssau.ru.users;

import org.springframework.data.jpa.domain.Specification;
import ssau.ru.utils.StringCriteria;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

class PathUserSpecification implements Specification<PathUser> {
    private final PathUserCriteria criteria;

    PathUserSpecification(PathUserCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<PathUser> root, CriteriaQuery<?> query,
                                 CriteriaBuilder cb) {
        return new StringCriteria(root.get("username"), criteria.getUsername())
                .<PathUser>toLikeSpecification().toPredicate(root, query, cb);
    }
}
