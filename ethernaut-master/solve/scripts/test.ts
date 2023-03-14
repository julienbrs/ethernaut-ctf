// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xBA12646CC07ADBe43F8bD25D83FB628D29C8A762";
const PLAYER_ADDRESS = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS);
    const contract = await ethers.getContractAt("Fallback", CONTRACT_ADDRESS, signer);

    const owner = await contract.owner();

    console.log(owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
