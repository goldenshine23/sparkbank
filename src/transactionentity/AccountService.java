@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepo;
    private final TransactionRepository transactionRepo;
    private final UserRepository userRepo;

    public Account createAccount(String username) {
        User user = userRepo.findByUsername(username).orElseThrow();

        if (user.getAccount() != null)
            throw new RuntimeException("Account already exists for user");

        Account account = new Account();
        account.setAccountNumber(UUID.randomUUID().toString().substring(0, 10));
        account.setBalance(0.0);
        account.setUser(user);

        user.setAccount(account);

        return accountRepo.save(account);
    }

    public Account getAccount(String username) {
        return userRepo.findByUsername(username)
                .map(User::getAccount)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public void deposit(String username, Double amount, String description) {
        Account account = getAccount(username);
        account.setBalance(account.getBalance() + amount);
        accountRepo.save(account);

        saveTransaction(account, "DEPOSIT", amount, description);
    }

    public void withdraw(String username, Double amount, String description) {
        Account account = getAccount(username);
        if (account.getBalance() < amount)
            throw new RuntimeException("Insufficient balance");

        account.setBalance(account.getBalance() - amount);
        accountRepo.save(account);

        saveTransaction(account, "WITHDRAWAL", amount, description);
    }

    public void transfer(String senderUsername, String receiverAccountNumber, Double amount) {
        Account sender = getAccount(senderUsername);
        Account receiver = accountRepo.findByAccountNumber(receiverAccountNumber)
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        if (sender.getBalance() < amount)
            throw new RuntimeException("Insufficient balance");

        // Perform transfer
        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);
        accountRepo.save(sender);
        accountRepo.save(receiver);

        saveTransaction(sender, "TRANSFER", amount, "Transfer to " + receiver.getAccountNumber());
        saveTransaction(receiver, "DEPOSIT", amount, "Received from " + sender.getAccountNumber());
    }

    public List<Transaction> getTransactionHistory(String username) {
        Account account = getAccount(username);
        return transactionRepo.findByAccount(account);
    }

    private void saveTransaction(Account account, String type, Double amount, String desc) {
        Transaction tx = new Transaction();
        tx.setAccount(account);
        tx.setAmount(amount);
        tx.setType(type);
        tx.setDescription(desc);
        tx.setTimestamp(LocalDateTime.now());
        transactionRepo.save(tx);
    }
}
