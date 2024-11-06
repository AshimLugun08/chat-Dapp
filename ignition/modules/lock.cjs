// Import the buildModule function from Hardhat Ignition modules
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Define constants for the unlock time and locked amount
const JAN_1ST_2030 = 1893456000; // Unix timestamp for January 1st, 2030
const ONE_GWEI = 1_000_000_000n; // Amount in Gwei (1 Gwei)

// Define and export the deployment module
module.exports = buildModule("ChatModule", (m) => {
  // Retrieve parameters for unlock time and locked amount, using defaults if not provided
  
  // Deploy the Lock contract with the specified unlock time and locked amount
  const lock = m.contract("ChatApps");
console.log(lock.address)
  // Return the deployed contract instance
  return { lock };
});
