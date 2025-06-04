@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
    private Double balance;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
