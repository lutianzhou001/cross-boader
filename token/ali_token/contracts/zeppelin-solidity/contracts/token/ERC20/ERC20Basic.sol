pragma solidity ^0.4.0;


/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * See https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(identity _who) public view returns (uint256);
  function transfer(identity _to, uint256 _value) public returns (bool);
  event Transfer(identity indexed from, identity indexed to, uint256 value);
}
