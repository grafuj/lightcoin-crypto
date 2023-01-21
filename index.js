class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let change of this.transactions) {
      // console.log('change.value:', change.value);
      balance += change.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()){
      console.log('its allowed!');
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Deposit extends Transaction {
  isAllowed() {
    if (this.account.balance + this.amount > 0) {   //can also be this.balance > this.amount
      console.log('returned true');
      return true;
    } else {
      console.log('returned false');
      return false;
    }
  }
  get value() {
    return this.amount;
  }
}
class Withdrawal extends Transaction {
  isAllowed() {
    if (this.account.balance - this.amount > 0) {   //can also be this.balance > this.amount
      return true;
    } else {
      console.log("Go away, you have no money :(");
      return false;
    }
  }

  get value() {
    return -this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Bangor Test");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('value:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log('value:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('value:', myAccount.balance);
