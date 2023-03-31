// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import { isHexString } from "ethers/lib/utils";
import { assert } from "console";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT_ADDRESS = contractAddresses.Privacy;

async function main() {
    console.log("Script to solve Privacy puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Privacy", CONTRACT_ADDRESS, attacker);

    const data = await ethers.provider.getStorageAt(contract.address, 5);
    console.log(`data[2] in bytes32 = ${data}`);
    const data16bytes = data.slice(0, 34);

    console.log(`data[2]  in Bytes16 = ${data16bytes}`);
    const bytes16Value = data.slice(0, 16); // take the first 16 bytes
    console.log(`data[2]  from Bytes32 to bytes16 by casting to bytes16 = ${bytes16Value}`);

    await contract.unlock(data16bytes);

    const isLocked: boolean = await contract.locked();
    assert(!isLocked, "Contract is still locked");
    console.log("Contract unlocked, you can now submit the solution");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
