"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../soldoc/index");
const path = require("path");
const file = path.resolve(__dirname, './migrations.sol');
// console.log(generateCommentsFromFile(file))
console.log(index_1.generateCommentsFromText(`pragma solidity >=0.4.21 <0.6.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
`));
//# sourceMappingURL=gen.js.map