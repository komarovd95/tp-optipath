package ssau.ru.utils;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;


public class RangeCriteria {
    private final Expression<Number> expression;
    private final Double low;
    private final Double high;

    public RangeCriteria(Expression<Number> expression, String value) {
        this.expression = expression;

        String[] splitted = value.split("-");
        this.low = Double.parseDouble(splitted[0]);
        this.high = Double.parseDouble(splitted[1]);
    }

    public <T> Specification<T> toSpecification() {
        return (root, quest, cb) -> cb.and(cb.ge(expression, low),
                cb.le(expression, high));
    }
}
