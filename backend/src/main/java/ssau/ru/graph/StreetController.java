package ssau.ru.graph;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
public class StreetController {
    private final PagedResourcesAssembler<Street> assembler;
    private final StreetRepository streetRepository;
    private final EntityLinks entityLinks;

    @Autowired
    public StreetController(PagedResourcesAssembler<Street> assembler,
                               StreetRepository streetRepository,
                               EntityLinks entityLinks) {
        this.assembler = assembler;
        this.streetRepository = streetRepository;
        this.entityLinks = entityLinks;
    }

    @RequestMapping(value = "/api/streets", method = RequestMethod.GET)
    @ResponseBody
    public PagedResources<Resource<Street>> getStreets(
            @RequestParam(value = "streetName", required = false) String streetName,
            @RequestParam(value = "streetTypes", required = false) String[] streetTypes,
            Pageable pageable) {
        streetName = streetName == null ? "" : streetName;
        streetTypes = streetTypes == null ? new String[] {} : streetTypes;

        Page<Street> page = (streetTypes.length > 0)
                ? streetRepository
                    .findAllByStreetNameContainingIgnoreCaseAndStreetTypeIn(
                            streetName, streetTypes, pageable)
                : streetRepository
                    .findAllByStreetNameContainingIgnoreCase(
                            streetName, pageable);

        return assembler.toResource(page, entity ->
                new Resource<>(entity, entityLinks
                        .linkToSingleResource(Street.class,
                                entity.getId()).withSelfRel()));
    }

    @RequestMapping(value = "/api/streets", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Resource<Street>> createStreet(
            @RequestBody Street street) {
        Street saved = streetRepository.save(street);

        return new ResponseEntity<>(new Resource<>(saved,
                entityLinks.linkToSingleResource(
                        Street.class, saved.getId()).withSelfRel()),
                HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/streets/{streetId}", method = RequestMethod.GET)
    @ResponseBody
    public Resource<Street> getStreet(
            @PathVariable("streetId") Long streetId) {
        Street street = streetRepository.findOne(streetId);

        if (street == null) {
            throw new ResourceNotFoundException();
        }

        return new Resource<>(street,
                entityLinks.linkToSingleResource(Street.class,
                        street.getId()).withSelfRel());
    }

    @RequestMapping(value = "/api/streets/{streetId}", method = RequestMethod.PATCH)
    @ResponseBody
    public Resource<Street> updateStreet(
            @PathVariable("streetId") Long streetId,
            @RequestBody Street street) {
        Street entity = streetRepository.findOne(streetId);

        if (entity == null) {
            throw new ResourceNotFoundException();
        }

        if (street.getStreetName() != null) {
            entity.setStreetName(street.getStreetName());
        }

        if (street.getStreetType() != null) {
            entity.setStreetType(street.getStreetType());
        }

        entity = streetRepository.save(entity);

        return new Resource<>(entity,
                entityLinks.linkToSingleResource(Street.class,
                        entity.getId()).withSelfRel());
    }

    @RequestMapping(value = "/api/streets/{streetId}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<Resource<Street>> deleteCoverType(
            @PathVariable("streetId") Long streetId) {
        streetRepository.delete(streetId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/api/streets/types", method = RequestMethod.GET)
    @ResponseBody
    public Set<String> getAllTypes() {
        return streetRepository.getAllTypes();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    private class ResourceNotFoundException extends RuntimeException {}
}

