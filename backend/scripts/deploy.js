const hre = require("hardhat");

async function main() {
  console.log("Deploying ClaimProcessor contract...");

  const ClaimProcessor = await hre.ethers.getContractFactory("ClaimProcessor");
  const claimProcessor = await ClaimProcessor.deploy();

  await claimProcessor.waitForDeployment();

  const address = await claimProcessor.getAddress();
  console.log("ClaimProcessor deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
