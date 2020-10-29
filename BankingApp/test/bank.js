const Bank = artifacts.require("Bank");

contract('Bank', (accounts) => {
  it('should put 20000 MetaCoin in the first account', async () => {
    const bankInstance = await Bank.deployed();
    const balance = await bankInstance.getBalance(accounts[0]);

    assert.equal(balance.valueOf(), 20000, "20000 wasn't in the first account");
  });

  it('should deposite 200 MetaCoin in the first account', async () => {
    const deposit = 200;
    const bankInstance = await Bank.deployed();
    const balanceBefore = await bankInstance.getBalanceFromMe();
    await bankInstance.deposit(deposit);
    const balanceAfter = await bankInstance.getBalanceFromMe();
    const diff = balanceAfter - balanceBefore;
    assert.equal(diff.valueOf(), deposit, "200 wasn't deposited into the account");
  });

  it('should withdraw 200 MetaCoin from the first account', async () => {
    const withdraw = 200;
    const bankInstance = await Bank.deployed();
    const balanceBefore = await bankInstance.getBalanceFromMe();
    await bankInstance.withdraw(withdraw);
    const balanceAfter = await bankInstance.getBalanceFromMe();
    const diff = balanceAfter - balanceBefore;
    assert.equal(diff.valueOf(), -withdraw, "200 wasn't withdrawed from the account");
  });

  it('should send coin correctly', async () => {
    const bankInstance = await Bank.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await bankInstance.getBalance(accountOne)).toNumber();
    const accountTwoStartingBalance = (await bankInstance.getBalance(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await bankInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await bankInstance.getBalance(accountOne)).toNumber();
    const accountTwoEndingBalance = (await bankInstance.getBalance(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
