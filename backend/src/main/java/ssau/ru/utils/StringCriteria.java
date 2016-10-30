package ssau.ru.utils;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

public class StringCriteria {
    private final Expression<String> expression;
    private final String value;

    public StringCriteria(Expression<String> expression, String value) {
        this.expression = expression;
        this.value = (value == null) ? "" : value.trim().toUpperCase();
    }

    public <T> Specification<T> toEqualsSpecification() {
        return (root, query, cb) -> cb.equal(cb.upper(expression), value);
    }

    public <T> Specification<T> toLikeSpecification() {
        return (root, query, cb) -> cb.like(cb.upper(expression), "%" + value + "%");
    }
}
