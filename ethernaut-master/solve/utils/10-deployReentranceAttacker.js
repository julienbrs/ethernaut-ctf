const { ethers } = require("hardhat");
const fs = require("fs");
const contractAddresses = require("../constants/contractAddresses.json");

// Localhost hardhat n°10
const ATTACKER_ADDRESS = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";
const REENTRANCE_ADDRESS = contractAddresses.Reentrance;

async function main() {
    const attacker = await ethers.getSigner(ATTACKER_ADDRESS);

    // Compile contracts
    const ReentranceAttacker = await ethers.getContractFactory("ReentranceAttacker", attacker);

    // Deploy
    const reentranceAttacker = await ReentranceAttacker.deploy(REENTRANCE_ADDRESS);
    await reentranceAttacker.deployed();

    console.log(`ReentranceAttacker deployed to: ${reentranceAttacker.address}`);

    contractAddresses.ReentranceAttacker = reentranceAttacker.address;
    fs.writeFileSync(
        __dirname + "/../constants/contractAddresses.json",
        JSON.stringify(contractAddresses, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
