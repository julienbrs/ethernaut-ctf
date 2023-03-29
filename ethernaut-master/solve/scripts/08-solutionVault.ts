// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT = contractAddresses.Vault;

async function main() {
    console.log("Script to solve Vault puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Vault", CONTRACT, attacker);

    const passwordBytes = await ethers.provider.getStorageAt(CONTRACT, 1);
    console.log("Password in bytes is: ", passwordBytes);
    const passwordUtf8 = ethers.utils.toUtf8String(passwordBytes);
    console.log("Password in UTF-8 is: ", passwordUtf8);
    await contract.unlock(passwordBytes);
    const locked = await contract.locked();

    assert(locked === false, "Contract still locked");
    console.log("Contract unlocked, you can submit the solution");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
