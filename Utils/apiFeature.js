import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { chatAppAddress, chatAppAbi } from "@/Context/Constant";

// Check if wallet is connected
export const checkIfWalletConnected = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install MetaMask");
            return;
        }
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
};

// Connect wallet function
export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install MetaMask");
            return;
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
};

// Fetch the smart contract
export const fetchSmartContract = (signerOrProvider) => {
    return new ethers.Contract(chatAppAddress, chatAppAbi, signerOrProvider);
};

// Connect with the smart contract
export const connectingWithContract = async () => {
    try {
        // Check if the user's browser has MetaMask (or any injected Ethereum provider)
        if (!window.ethereum) {
            console.log("Please install MetaMask!");
            return;
        }

        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        // Create a provider connected to MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Get the signer to sign transactions
        const signer = provider.getSigner();
        // console.log(chatAppAbi)
        // Connect to the contract with the signer
        const contract = new ethers.Contract(chatAppAddress, chatAppAbi, signer);
        // console.log("jasdnfbj")
        return contract;
    } catch (error) {
        console.error("Error connecting to the contract:", error);
    }
};

// Utility function to convert time
export const convertTime = (time) => {
    const newTime = new Date(time.toNumber() * 1000);
    const formattedTime = 
        newTime.getHours().toString().padStart(2, '0') + ":" +
        newTime.getMinutes().toString().padStart(2, '0') + ":" +
        newTime.getSeconds().toString().padStart(2, '0') + " " +
        newTime.getDate().toString().padStart(2, '0') + "/" +
        (newTime.getMonth() + 1).toString().padStart(2, '0') + "/" +
        newTime.getFullYear();
        
    return formattedTime;
};
