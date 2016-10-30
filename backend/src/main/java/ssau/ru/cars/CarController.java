package ssau.ru.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RepositoryRestController
public class CarController implements ResourceProcessor<Resource<Car>> {
    private final CarRepository repository;
    private final PagedResourcesAssembler<Car> assembler;

    @Autowired
    public CarController(CarRepository repository,
                         PagedResourcesAssembler<Car> assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/cars/search/filter")
    @ResponseBody
    public PagedResources<Resource<Car>> filter(CarCriteria criteria,
                                                Pageable pageable) {
        Specification<Car> specification = new CarSpecification(criteria);
        return assembler.toResource(repository.findAll(specification, pageable));
    }


    @Override
    public Resource<Car> process(Resource<Car> resource) {
        resource.add(ControllerLinkBuilder.linkTo(
                ControllerLinkBuilder.methodOn(CarController.class)
                        .filter(null, null)).withRel("filter"));
        return resource;
    }
}
