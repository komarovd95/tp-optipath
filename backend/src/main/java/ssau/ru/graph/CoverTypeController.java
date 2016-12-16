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


@RestController
public class CoverTypeController {
    private final PagedResourcesAssembler<CoverType> assembler;
    private final CoverTypeRepository coverTypeRepository;
    private final EntityLinks entityLinks;

    @Autowired
    public CoverTypeController(PagedResourcesAssembler<CoverType> assembler,
                               CoverTypeRepository coverTypeRepository,
                               EntityLinks entityLinks) {
        this.assembler = assembler;
        this.coverTypeRepository = coverTypeRepository;
        this.entityLinks = entityLinks;
    }

    @RequestMapping(value = "/api/coverTypes", method = RequestMethod.GET)
    @ResponseBody
    public PagedResources<Resource<CoverType>> getCoverTypes(
            @RequestParam(value = "coverTypeName", required = false) String coverTypeName,
            Pageable pageable) {
        coverTypeName = coverTypeName == null ? "" : coverTypeName;

        Page<CoverType> page = coverTypeRepository
                .findAllByCoverTypeNameContainingIgnoreCase(coverTypeName, pageable);

        return assembler.toResource(page, entity ->
                new Resource<>(entity, entityLinks
                        .linkToSingleResource(CoverType.class,
                                entity.getId()).withSelfRel()));
    }

    @RequestMapping(value = "/api/coverTypes", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Resource<CoverType>> createCoverType(
            @RequestBody CoverType coverType) {
        CoverType saved = coverTypeRepository.save(coverType);

        return new ResponseEntity<>(new Resource<>(saved,
                entityLinks.linkToSingleResource(
                        CoverType.class, saved.getId()).withSelfRel()),
                HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/coverTypes/{typeId}", method = RequestMethod.GET)
    @ResponseBody
    public Resource<CoverType> getCoverType(
            @PathVariable("typeId") Long typeId) {
        CoverType coverType = coverTypeRepository.findOne(typeId);

        if (coverType == null) {
            throw new ResourceNotFoundException();
        }

        return new Resource<>(coverType,
                        entityLinks.linkToSingleResource(CoverType.class,
                                coverType.getId()).withSelfRel());
    }

    @RequestMapping(value = "/api/coverTypes/{typeId}", method = RequestMethod.PATCH)
    @ResponseBody
    public Resource<CoverType> updateCoverType(
            @PathVariable("typeId") Long typeId,
            @RequestBody CoverType coverType) {
        CoverType entity = coverTypeRepository.findOne(typeId);

        if (entity == null) {
            throw new ResourceNotFoundException();
        }

        if (coverType.getCoverTypeName() != null) {
            entity.setCoverTypeName(coverType.getCoverTypeName());
        }

        if (coverType.getSlowdown() != null) {
            entity.setSlowdown(coverType.getSlowdown());
        }

        entity = coverTypeRepository.save(entity);

        return new Resource<>(entity,
                entityLinks.linkToSingleResource(CoverType.class,
                        entity.getId()).withSelfRel());
    }

    @RequestMapping(value = "/api/coverTypes/{typeId}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<Resource<CoverType>> deleteCoverType(
            @PathVariable("typeId") Long typeId) {
        coverTypeRepository.delete(typeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    private class ResourceNotFoundException extends RuntimeException {}
}
