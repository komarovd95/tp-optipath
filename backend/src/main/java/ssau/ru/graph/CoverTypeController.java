package ssau.ru.graph;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class CoverTypeController {
    @RequestMapping(path = "/api/covers", method = RequestMethod.GET)
    public List<CoverType> getCoverTypes() {
        return Arrays.asList(CoverType.values());
    }
}
