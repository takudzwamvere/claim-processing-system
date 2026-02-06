const { ethers } = require('ethers');
require('dotenv').config();

// Contract Artifact (ABI)
// Note: This requires the contract to be compiled first
const ClaimProcessorArtifact = require('../../artifacts/contracts/ClaimProcessor.sol/ClaimProcessor.json');

const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545/';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // Set this after deployment
const PRIVATE_KEY = process.env.PRIVATE_KEY;

let provider;
let wallet;
let contract;

try {
    if (PRIVATE_KEY) {
        provider = new ethers.JsonRpcProvider(RPC_URL);
        wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        
        if (CONTRACT_ADDRESS) {
            contract = new ethers.Contract(CONTRACT_ADDRESS, ClaimProcessorArtifact.abi, wallet);
            console.log("Blockchain connected and contract loaded.");
        } else {
            console.warn("Contract address not set in .env. Blockchain features will perform limited functions.");
        }
    } else {
        console.warn("Private Key not set. Blockchain integration disabled.");
    }
} catch (error) {
    console.error("Failed to initialize blockchain connection:", error);
}

module.exports = {
    provider,
    wallet,
    contract
};
