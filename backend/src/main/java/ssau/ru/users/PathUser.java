package ssau.ru.users;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ssau.ru.DomainObject;
import ssau.ru.graph.Car;
import ssau.ru.graph.PathGraph;
import ssau.ru.graph.Route;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.*;

@Entity
@Table(name = "USERS")
public class PathUser extends DomainObject<Long> {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id @GeneratedValue
    private Long id;

    @Column(name = "user_name", unique = true, length = 20, nullable = false)
    @NotNull @Size(min = 4, max = 20) @Pattern(regexp = "^[a-zA-Z0-9]+$")
    private String username;

    @Column(name = "user_pass", nullable = false)
    @NotNull @JsonIgnore
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @Size(min = 1)
    private Set<String> roles;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PathGraph> pathGraphs;

    //private List<Route> routes;

    //private List<Car> cars;

    private PathUser() {
        pathGraphs = new ArrayList<>();
    }

    public PathUser(String username, String password, String... roles) {
        this();
        this.username = username;
        this.setPassword(Objects.requireNonNull(password));
        this.setRoles(Objects.requireNonNull(roles));
    }

    @JsonCreator
    public PathUser(@JsonProperty("username") String username,
                    @JsonProperty("password") String password) {
        this(username, password, "ROLE_USER");
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty("password")
    public void setPassword(CharSequence password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    @JsonProperty("roles")
    public Set<String> getRoles() {
        return roles;
    }

    @JsonIgnore
    public void setRoles(String[] roles) {
        this.roles = Collections.unmodifiableSet(new HashSet<>(Arrays.asList(roles)));
    }

    public List<PathGraph> getPathGraphs() {
        return Collections.unmodifiableList(pathGraphs);
    }

    public void addPathGraph(PathGraph graph) {
        this.pathGraphs.add(Objects.requireNonNull(graph));
    }
}
