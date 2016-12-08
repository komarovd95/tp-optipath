package ssau.ru.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.*;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

@RepositoryRestController
public class PathUserController implements ResourceProcessor<Resource<PathUser>> {
    private final PathUserRepository userRepository;
    private final PagedResourcesAssembler<PathUser> assembler;
    private final EntityLinks entityLinks;

    @Autowired
    public PathUserController(PathUserRepository userRepository,
                              PagedResourcesAssembler<PathUser> assembler,
                              EntityLinks entityLinks) {
        this.userRepository = userRepository;
        this.assembler = assembler;
        this.entityLinks = entityLinks;
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
    public Resource<PathUser> principal(Principal user) {
        PathUser pathUser = userRepository.findByUsername(user.getName());

        return new Resource<>(pathUser, Collections.singletonList(
                entityLinks.linkToSingleResource(PathUser.class, pathUser.getId())
                        .withSelfRel()));
    }

    @Override
    public Resource<PathUser> process(Resource<PathUser> resource) {
        resource.add(ControllerLinkBuilder.linkTo(
                ControllerLinkBuilder.methodOn(PathUserController.class)
                        .filterUsername(null, null)).withRel("filter"));
        return resource;
    }
}
