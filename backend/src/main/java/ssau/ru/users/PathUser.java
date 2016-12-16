package ssau.ru.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ssau.ru.DomainObject;
import ssau.ru.cars.Car;
import ssau.ru.graph.PathGraph;

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
    @NotNull
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @Size(min = 1)
    private Set<String> roles;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<PathGraph> pathGraphs;

    @Enumerated(EnumType.STRING)
    private DriveStyle driveStyle;

    @ManyToMany
    private List<Car> ownCars;

    public PathUser() {
        this.setRoles(new String[] {"ROLE_USER"});
        this.driveStyle = DriveStyle.LAW_ABIDING;
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

    @JsonSetter("password")
    public void setPassword(CharSequence password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = new HashSet<>(Arrays.asList(roles));
    }

    public List<PathGraph> getPathGraphs() {
        return pathGraphs;
    }

    public void setPathGraphs(List<PathGraph> graphs) {
        this.pathGraphs = graphs;
    }

    public DriveStyle getDriveStyle() {
        return driveStyle;
    }

    public void setDriveStyle(DriveStyle driveStyle) {
        this.driveStyle = driveStyle;
    }

    public List<Car> getOwnCars() {
        return ownCars;
    }

    public void setOwnCars(List<Car> cars) {
        this.ownCars = cars;
    }

    @JsonProperty("routes")
    public int getRoutesCount() {
        return pathGraphs == null ? 0 : pathGraphs.size();
    }

    @JsonProperty("cars")
    public int getCarsCount() {
        return ownCars == null ? 0 : ownCars.size();
    }
}
