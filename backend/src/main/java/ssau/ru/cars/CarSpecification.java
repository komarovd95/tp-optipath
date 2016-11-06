package ssau.ru.cars;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import ssau.ru.utils.NumberCriteria;
import ssau.ru.utils.StringCriteria;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
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
            specifications.add(new StringCriteria(root.get("brand").get("brandName"),
                    criteria.getBrand()).toEqualsSpecification());
        }

        if (criteria.getFuelType() != null) {
            specifications.add(new StringCriteria(root.get("fuelType").get("fuelTypeName"),
                    criteria.getFuelType()).toEqualsSpecification());
        }

        if (criteria.getFuelConsumption() != null) {
            specifications.add(NumberCriteria.fromString(
                    criteria.getFuelConsumption(), root.get("fuelConsumption")));
        }

        if (criteria.getMaxVelocity() != null) {
            specifications.add(NumberCriteria.fromString(
                    criteria.getMaxVelocity(), root.get("maxVelocity")));
        }

        Specification<Car> result = specifications.get(0);
        for (int i = 1; i < specifications.size(); i++) {
            result = Specifications.where(result).and(specifications.get(i));
        }

        return result.toPredicate(root, query, cb);
    }
}
