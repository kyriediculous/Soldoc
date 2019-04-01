pragma solidity >=0.4.21 <0.6.0;

/// @title Migrations
/// @notice
/// @dev
contract Migrations {
  /// @notice
  address public owner;
  /// @notice
  uint public last_completed_migration;


  /// @notice
  /// @dev
  constructor() public {
    owner = msg.sender;
  }

  /// @dev
  modifier restricted() {
    if (msg.sender == owner) _;
  }


  /// @notice
  /// @dev
  /// @param completed (uint)
  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
  

  
  /// @notice
  /// @dev
  /// @param new_address (address)
  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }


  /// @notice
  /// @dev
  /// @param me (string) Hello Wooooooooooorld
  /// @param boolie (bool) Hello Woooooooooooooorld
  /// @return me (string) Hello world  
  /// @return boolie (bool) Hello World
  function returnMe(string me, bool boolie) public pure returns (string me, bool boolie) {
  }
}





























































