pragma solidity ^0.4.0;

import "./ERC20Basic.sol";


/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
  function allowance(identity _owner, identity _spender)
    public view returns (uint256);

  function transferFrom(identity _from, identity _to, uint256 _value)
    public returns (bool);

  function approve(identity _spender, uint256 _value) public returns (bool);
  event Approval(
    identity indexed owner,
    identity indexed spender,
    uint256 value
  );
}
