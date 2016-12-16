package ssau.ru.utils;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;

public class InCriteria {
    private final Expression<String> expression;
    private final String[] values;

    public InCriteria(Expression<String> expression, String[] values) {
        this.expression = expression;
        this.values = values;
    }

    public <T> Specification<T> toSpecification() {
        return (root, query, cb) -> expression.in((Object[]) values);
    }
}
