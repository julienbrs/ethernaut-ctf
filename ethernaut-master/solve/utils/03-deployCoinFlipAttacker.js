const { ethers } = require("hardhat");
const fs = require("fs");
const contractAddresses = require("../constants/contractAddresses.json");

// Localhost hardhat n°10
const ATTACKER_ADDRESS = "0xBcd4042DE499D14e55001CcbB24a551F3b954096";
const COINFLIPADDRESS = contractAddresses.CoinFLip;

async function main() {
    const attacker = await ethers.getSigner(ATTACKER_ADDRESS);

    // Compile contracts
    const CoinFlipAttacker = await ethers.getContractFactory("CoinFlipAttacker", attacker);

    // Deploy
    const coinFlipAttacker = await CoinFlipAttacker.deploy(COINFLIPADDRESS);
    await coinFlipAttacker.deployed();

    console.log(`CoinFlipAttacker deployed to: ${coinFlipAttacker.address}`);

    contractAddresses.CoinFlipAttacker = coinFlipAttacker.address;
    fs.writeFileSync(
        __dirname + "/../constants/contractAddresses.json",
        JSON.stringify(contractAddresses, null, 2)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
