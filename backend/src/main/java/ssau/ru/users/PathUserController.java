package ssau.ru.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RepositoryRestController
public class PathUserController implements ResourceProcessor<Resource<PathUser>> {
    private final PathUserRepository userRepository;
    private final PagedResourcesAssembler<PathUser> assembler;

    @Autowired
    public PathUserController(PathUserRepository userRepository,
                              PagedResourcesAssembler<PathUser> assembler) {
        this.userRepository = userRepository;
        this.assembler = assembler;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/users/search/filter")
    @ResponseBody
    public PagedResources<Resource<PathUser>> filterUsername(PathUserCriteria criteria,
                                                             Pageable pageable) {
        return assembler.toResource(
                userRepository.findAll(new PathUserSpecification(criteria), pageable));
    }

    @RequestMapping("/users/user")
    @ResponseBody
    public PathUser principal(Principal user) {
        return userRepository.findByUsername(user.getName());
    }

    @Override
    public Resource<PathUser> process(Resource<PathUser> resource) {
        resource.add(ControllerLinkBuilder.linkTo(
                ControllerLinkBuilder.methodOn(PathUserController.class)
                        .filterUsername(null, null)).withRel("filter"));
        return resource;
    }
}
