package ssau.ru.cars;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import ssau.ru.users.PathUser;
import ssau.ru.utils.InCriteria;
import ssau.ru.utils.RangeCriteria;
import ssau.ru.utils.StringCriteria;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

class CarSpecification implements Specification<Car> {
    private CarCriteria criteria;

    CarSpecification(CarCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Car> root, CriteriaQuery<?> query,
                                 CriteriaBuilder cb) {
        List<Specification<Car>> specifications = new ArrayList<>();

        specifications.add(new StringCriteria(root.get("name"), criteria.getName())
                .toLikeSpecification());

        if (criteria.getBrand() != null) {
            specifications.add(new InCriteria(root.get("brand").get("brandName"),
                    criteria.getBrand()).toSpecification());
        }

        if (criteria.getFuelType() != null) {
            specifications.add(new InCriteria(root.get("fuelType").get("fuelTypeName"),
                    criteria.getFuelType()).toSpecification());
        }

        if (criteria.getFuelConsumption() != null) {
            specifications.add(new RangeCriteria(root.get("fuelConsumption"),
                    criteria.getFuelConsumption()).toSpecification());
        }

        if (criteria.getMaxVelocity() != null) {
            specifications.add(new RangeCriteria(root.get("maxVelocity"),
                    criteria.getMaxVelocity()).toSpecification());
        }

        if (criteria.getOnlyMine() && criteria.getOwnerId() != null) {
            specifications.add((root1, query1, cb1) ->
                    cb1.equal(root.join("owners").get("id"),
                            criteria.getOwnerId()));
        }

        Specification<Car> result = specifications.get(0);
        for (int i = 1; i < specifications.size(); i++) {
            result = Specifications.where(result).and(specifications.get(i));
        }

        return result.toPredicate(root, query, cb);
    }
}
