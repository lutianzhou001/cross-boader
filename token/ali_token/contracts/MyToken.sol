pragma solidity ^0.4.0;

import './zeppelin-solidity/contracts/ownership/Ownable.sol';
import './zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract MyToken is StandardToken, Ownable {
  string public constant name = 'Token Bank Asset';
  string public constant symbol = 'TBA';
  uint8 public constant decimals = 18;
  uint256 public constant INITIAL_SUPPLY = 10000000000;

  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
