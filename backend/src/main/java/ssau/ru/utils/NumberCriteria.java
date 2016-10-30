package ssau.ru.utils;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import javax.persistence.criteria.Expression;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class NumberCriteria {
    private final static Pattern EQUAL_TERM = Pattern.compile("=?([+-]?\\d+)");
    private final static Pattern OP_TERM = Pattern.compile("([<>]=?|<>)([+-]?\\d+)");
    private final static Pattern RANGE_TERM = Pattern.compile("([+-]?\\d+)-([+-]?\\d+)");

    private final Expression<Number> expression;
    private final String operation;
    private final List<Number> values;

    private NumberCriteria(Expression<Number> expression, String operation, Number... values) {
        this.expression = expression;
        this.operation = operation;
        this.values = new ArrayList<>();
        Collections.addAll(this.values, values);
    }

    public <T> Specification<T> toSpecification() {
        return (root, query, cb) -> {
            switch (operation) {
                case "=":
                    return cb.equal(expression, values.get(0));
                case "-":
                    return cb.and(cb.ge(expression, values.get(0)),
                            cb.le(expression, values.get(1)));
                case "<":
                    return cb.lt(expression, values.get(0));
                case "<=":
                    return cb.le(expression, values.get(0));
                case ">":
                    return cb.gt(expression, values.get(0));
                case ">=":
                    return cb.ge(expression, values.get(0));
                case "<>":
                    return cb.notEqual(expression, values.get(0));
                default:
                    return null;
            }
        };
    }

    public static NumberCriteria build(Expression<Number> expression, String value) {
        Matcher matcher;

        matcher = EQUAL_TERM.matcher(value);
        if (matcher.matches()) {
            return new NumberCriteria(expression, "=",
                    Integer.parseInt(matcher.group()));
        }

        matcher = OP_TERM.matcher(value);
        if (matcher.matches()) {
            return new NumberCriteria(expression, matcher.group(1),
                    Integer.parseInt(matcher.group(2)));
        }

        matcher = RANGE_TERM.matcher(value);
        if (matcher.matches()) {
            return new NumberCriteria(expression, "-",
                    Integer.parseInt(matcher.group(1)),
                    Integer.parseInt(matcher.group(2)));
        }

        return new NumberCriteria(expression, "");
    }

    public static <T> Specification<T> fromString(String value,
                                                              Expression<Number> expression) {
        List<Specification<T>> specifications =  Arrays.stream(value.split(","))
                .map(s -> NumberCriteria.build(expression, s)
                        .<T>toSpecification()).collect(Collectors.toList());

        if (specifications.size() > 0) {
            Specification<T> result = specifications.get(0);
            for (int i = 1; i < specifications.size(); i++) {
                result = Specifications.where(result).or(specifications.get(i));
            }

            return result;
        } else {
            return new NumberCriteria(expression, "").toSpecification();
        }
    }
}
