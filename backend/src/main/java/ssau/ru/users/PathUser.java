package ssau.ru.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
public class PathUser {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id @GeneratedValue
    private Long id;

    @Column(name = "user_name", unique = true, length = 20, nullable = false)
    @NotNull @Size(min = 4, max = 20) @Pattern(regexp = "^[a-zA-Z0-9]+$")
    private String username;

    @Column(name = "user_pass", nullable = false)
    @JsonIgnore
    @NotNull
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<String> roles;

    public PathUser() {}

    public PathUser(String username, String password, Collection<String> roles) {
        this.username = username;
        this.setPassword(password);
        this.setRoles(roles);
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

    public String getPassword() {
        return password;
    }

    public void setPassword(CharSequence password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Collection<String> roles) {
        this.roles = Collections.unmodifiableSet(new HashSet<>(roles));
    }
}
