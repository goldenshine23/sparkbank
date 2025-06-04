@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String fullName;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Account account;
}
