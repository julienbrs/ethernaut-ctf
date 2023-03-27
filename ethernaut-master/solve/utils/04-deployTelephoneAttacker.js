const { ethers } = require("hardhat");
const fs = require("fs");
const contractAddresses = require("../constants/contractAddresses.json");

// Localhost hardhat n°10
const ATTACKER_ADDRESS = contractAddresses.Player;
const TELEPHONEADDRESS = contractAddresses.Telephone;

async function main() {
    const attacker = await ethers.getSigner(ATTACKER_ADDRESS);

    // Compile contracts
    const TelephoneAttacker = await ethers.getContractFactory("TelephoneAttacker", attacker);

    // Deploy
    const telephoneAttacker = await TelephoneAttacker.deploy(TELEPHONEADDRESS);
    await telephoneAttacker.deployed();

    console.log(`telephoneAttacker deployed to: ${telephoneAttacker.address}`);

    contractAddresses.TelephoneAttacker = telephoneAttacker.address;
    fs.writeFileSync(
        __dirname + "/../constants/contractAddresses.json",
        JSON.stringify(contractAddresses, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
