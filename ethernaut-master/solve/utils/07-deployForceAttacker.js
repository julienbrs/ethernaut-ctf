const { ethers } = require("hardhat");
const contractAddresses = require("../constants/contractAddresses.json");
const fs = require("fs");

// Localhost hardhat n°10
const ATTACKER_ADDRESS = contractAddresses.Player;
const FORCEADDRESS = contractAddresses.Force;

async function main() {
    const attacker = await ethers.getSigner(ATTACKER_ADDRESS);

    // Compile contracts
    const ForceAttacker = await ethers.getContractFactory("ForceAttacker", attacker);

    // Deploy
    const forceAttacker = await ForceAttacker.deploy(FORCEADDRESS);
    await forceAttacker.deployed();

    console.log(`forceAttacker deployed to: ${forceAttacker.address}`);

    contractAddresses.ForceAttacker = forceAttacker.address;
    fs.writeFileSync(
        __dirname + "/../constants/contractAddresses.json",
        JSON.stringify(contractAddresses, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
