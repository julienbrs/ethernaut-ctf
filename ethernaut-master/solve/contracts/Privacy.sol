// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {
    // bool takes up 1 byte of storage, here slot 0
    bool public locked = true;
    // uint256 takes up 32 bytes of storage, here slot 1
    uint256 public ID = block.timestamp;
    // Uint8 takes up 1 byte of storage, here slot 2
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    // uint16 takes up 2 bytes of storage, here still slot 2
    uint16 private awkwardness = uint16(block.timestamp);
    // Bytes32[3] takes up 96 bytes of storage, here slots 3, 4, 5
    // So data[2] is at slot 5
    bytes32[3] private data;

    constructor(bytes32[3] memory _data) {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
