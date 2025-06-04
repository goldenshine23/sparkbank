@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(Authentication auth) {
        return ResponseEntity.ok(accountService.createAccount(auth.getName()));
    }

    @GetMapping("/me")
    public ResponseEntity<Account> getMyAccount(Authentication auth) {
        return ResponseEntity.ok(accountService.getAccount(auth.getName()));
    }

    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(Authentication auth, @RequestParam Double amount, @RequestParam String description) {
        accountService.deposit(auth.getName(), amount, description);
        return ResponseEntity.ok("Deposit successful");
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(Authentication auth, @RequestParam Double amount, @RequestParam String description) {
        accountService.withdraw(auth.getName(), amount, description);
        return ResponseEntity.ok("Withdrawal successful");
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(
            Authentication auth,
            @RequestParam String toAccountNumber,
            @RequestParam Double amount) {
        accountService.transfer(auth.getName(), toAccountNumber, amount);
        return ResponseEntity.ok("Transfer successful");
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> transactions(Authentication auth) {
        return ResponseEntity.ok(accountService.getTransactionHistory(auth.getName()));
    }
}
