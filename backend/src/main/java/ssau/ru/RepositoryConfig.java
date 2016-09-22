package ssau.ru;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleSerializers;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;
import com.fasterxml.jackson.databind.ser.std.BeanSerializerBase;
import com.fasterxml.jackson.databind.util.NameTransformer;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import ssau.ru.graph.PathEdge;
import ssau.ru.graph.PathNode;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(PathNode.class);
    }

    @Override
    public void configureJacksonObjectMapper(ObjectMapper objectMapper) {
        objectMapper.registerModule(new Module() {
            @Override
            public String getModuleName() {
                return "custom.module";
            }

            @Override
            public Version version() {
                return Version.unknownVersion();
            }

            @Override
            public void setupModule(SetupContext context) {
//                SimpleSerializers serializers = new SimpleSerializers();
//                serializers.addSerializer(PathNode.class, new PathEdge.NodeSerializer());
//                context.addSerializers(serializers);

                context.addBeanSerializerModifier(new BeanSerializerModifier() {
                    @Override
                    public JsonSerializer<?> modifySerializer(SerializationConfig config, BeanDescription beanDesc,
                                                              JsonSerializer<?> serializer) {
                        beanDesc.
                        if (beanDesc.getBeanClass().equals(PathNode.class)) {
                            return new PathEdge.BeanIdOnlySerializer((BeanSerializerBase) serializer,
                                    NameTransformer.NOP);
                        }
                        return serializer;
                    }
                });
            }
        });
    }
}
