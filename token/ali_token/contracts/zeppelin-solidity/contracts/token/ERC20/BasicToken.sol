pragma solidity ^0.4.0;


import "./ERC20Basic.sol";
import "../../math/SafeMath.sol";


/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic {
  using SafeMath for uint256;

  mapping(identity => uint256) internal balances;

  uint256 internal totalSupply_;

  /**
  * @dev Total number of tokens in existence
  */
  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  /**
  * @dev Transfer token for a specified identity
  * @param _to The identity to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(identity _to, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
    require(_to != identity(0));

    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
  * @dev Gets the balance of the specified identity.
  * @param _owner The identity to query the the balance of.
  * @return An uint256 representing the amount owned by the passed identity.
  */
  function balanceOf(identity _owner) public view returns (uint256) {
    return balances[_owner];
  }

}
