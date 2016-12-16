package ssau.ru.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.*;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ssau.ru.users.PathUser;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

@RepositoryRestController
public class CarController implements ResourceProcessor<Resource<Car>> {
    private final CarRepository repository;
    private final PagedResourcesAssembler<Car> assembler;
    private final EntityLinks entityLinks;

    @Autowired
    public CarController(CarRepository repository,
                         PagedResourcesAssembler<Car> assembler,
                         EntityLinks entityLinks) {
        this.repository = repository;
        this.assembler = assembler;
        this.entityLinks = entityLinks;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/cars/search/filter")
    @ResponseBody
    public PagedResources<Resource<Car>> filter(CarCriteria criteria,
                                                Pageable pageable) {
        Specification<Car> specification = new CarSpecification(criteria);
        Page<Car> cars = repository.findAll(specification, pageable);
        return assembler.toResource(cars.map(car -> {
            CarDTO dto = CarDTO.of(car);

            if (criteria.getOwnerId() != null) {
                dto.setOwned(car.getOwners().stream()
                        .mapToLong(PathUser::getId)
                        .anyMatch(id -> criteria.getOwnerId().equals(id)));

            }

            return dto;

//            return (Car) dto;
        }));
    }


    @Override
    public Resource<Car> process(Resource<Car> resource) {
        resource.add(ControllerLinkBuilder.linkTo(
                ControllerLinkBuilder.methodOn(CarController.class)
                        .filter(null, null)).withRel("filter"),
                entityLinks.linkToSingleResource(
                        Car.class, resource.getContent().getId()).withSelfRel()
        );

        return resource;
    }
}
