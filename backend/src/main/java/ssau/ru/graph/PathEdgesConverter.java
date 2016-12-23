package ssau.ru.graph;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = true)
public class PathEdgesConverter implements AttributeConverter<List<PathEdge>, String> {
    @Override
    public String convertToDatabaseColumn(List<PathEdge> attribute) {
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
    public List<PathEdge> convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        ObjectMapper mapper = new ObjectMapper();

        try {
            return (List<PathEdge>) mapper.readValue(dbData, ArrayList.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
