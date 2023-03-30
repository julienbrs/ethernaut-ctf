const { ethers } = require("hardhat");
const contractAddresses = require("../constants/contractAddresses.json");
const fs = require("fs");


// Localhost hardhat n°10
const ATTACKER_ADDRESS = contractAddresses.Player;
const KINGADDRESS = contractAddresses.King;

async function main() {
    const attacker = ethers.getSigner(ATTACKER_ADDRESS);

    // Compile contract
    const KingAttacker = await ethers.getContractFactory("KingAttacker", attacker);

    // Deploy
    const kingAttacker = await KingAttacker.deploy();
    await kingAttacker.deployed();

    console.log(`kingAttacker deployed to: ${kingAttacker.address}`);

    contractAddresses.KingAttacker = kingAttacker.address;
    fs.writeFileSync(
        __dirname + "/../constants/contractAddresses.json",
        JSON.stringify(contractAddresses, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
