package ssau.ru.graph;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = true)
public class PathNodesConverter implements AttributeConverter<List<PathNode>, String> {
    @Override
    public String convertToDatabaseColumn(List<PathNode> attribute) {
        if (attribute == null) {
            return null;
        }

        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<PathNode> convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        ObjectMapper mapper = new ObjectMapper();

        try {
            return (List<PathNode>) mapper.readValue(dbData, ArrayList.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
