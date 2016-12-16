package ssau.ru;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import ssau.ru.cars.*;
import ssau.ru.graph.*;
import ssau.ru.users.DriveStyle;
import ssau.ru.users.PathUser;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Bean
    public Validator validator() {
        return new LocalValidatorFactoryBean();
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(PathNode.class, PathEdge.class, PathGraph.class, PathUser.class,
                Car.class, CarBrand.class, FuelType.class, CoverType.class, Street.class,
                DriveStyle.class
        );
    }

    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener listener) {
        Validator validator = validator();

        listener.addValidator("beforeSave", validator);
    }
}
