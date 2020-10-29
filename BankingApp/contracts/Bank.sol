// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.8.0;


// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Bank {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() public {
		balances[tx.origin] = 20000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (!withdraw(amount)) return false;
		balances[receiver] += amount;
		// emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function withdraw(uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		return true;
	}

	function deposit( uint amount) public returns(bool sufficient) {
		if (amount <= 0) return false;
		balances[msg.sender] += amount;
		return true;
	}

	function getBalanceFromMe() public view returns(uint) {
		return getBalance(msg.sender);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
