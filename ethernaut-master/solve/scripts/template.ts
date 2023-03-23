// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { platform } from "os";

const CONTRACT_ADDRESS = "";
const PLAYER_ADDRESS = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";

async function main() {
    console.log(
        "Script to solve Hello Introduction puzzle \n ========================================== \n"
    );


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
