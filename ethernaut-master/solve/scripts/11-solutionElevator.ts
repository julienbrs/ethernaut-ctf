// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT_ADDRESS = contractAddresses.Elevator;
const ELEVATOR_ATTACKER = contractAddresses.ElevatorAttacker;

async function main() {
    console.log(
        "Script to solve Elevator puzzle \n ========================================== \n"
    );

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Elevator", CONTRACT_ADDRESS, attacker);
    const attackerContract = await ethers.getContractAt("ElevatorAttacker", ELEVATOR_ATTACKER, attacker);

    await attackerContract.goTo(42);

    // assert contract.top is true
    assert(await contract.top(), "Contract is not at top");
    console.log("Contract is at top, you can submit the solution now");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
