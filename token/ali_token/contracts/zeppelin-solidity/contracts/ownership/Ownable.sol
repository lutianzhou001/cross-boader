pragma solidity ^0.4.0;


/**
 * @title Ownable
 * @dev The Ownable contract has an owner identity, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  identity public owner;


  event OwnershipRenounced(identity indexed previousOwner);
  event OwnershipTransferred(
    identity indexed previousOwner,
    identity indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = identity(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The identity to transfer ownership to.
   */
  function transferOwnership(identity _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The identity to transfer ownership to.
   */
  function _transferOwnership(identity _newOwner) internal {
    require(_newOwner != identity(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}
