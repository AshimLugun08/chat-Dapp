"use client";
import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { checkIfWalletConnected, connectWallet, connectingWithContract } from "@/Utils/apiFeature";

export const ChatAppContect = createContext();

export const ChatAppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [friendMsg, setFriendsMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentuserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    // Fetch initial data on page load
    const fetchData = async () => {
        try {
            const contract = await connectingWithContract();
            const connectedAccount = await connectWallet();
            setAccount(connectedAccount);
            console.log(connectedAccount)
         
            const username = await contract.getUsername(connectedAccount);
            setUserName(username);
            console.log("hbvsjh",userName)
            const friends = await contract.getMyFriendList();
            setFriendsList(friends);

            const users = await contract.getAllAppUser();
            
            setUserList(users);
        } catch (error) {
            setError("Please install and connect your wallet");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Define other functions
    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const messages = await contract.readMessage(friendAddress);
            setFriendsMsg(messages);
        } catch (error) {
            setError("Currently, you have no messages.");
        }
    };

    const createAccount = async ({ name, accountAddress }) => {
        try {
            // Convert name to a string, in case it's not already
            const user = String(name).trim();
            
            if (!user) {
                return setError("Name cannot be empty. Please provide a valid name.");
            }
            
            console.log("Creating account with name:", user);
    
            const contract = await connectingWithContract();
            const createUser = await contract.createAccount(user); // Pass userName as a string
            setLoading(true);
            await createUser.wait();
            setLoading(false);
            console.log("Account created successfully");
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account. Please reload the page.");
            console.error("Account creation error:", error);
        }
    };
    

    const addFriend = async (name, accountAddress) => {
        console.log(name,accountAddress)
        try {
            if (!name || !accountAddress) return setError("Please provide name and address.");

            const contract = await connectingWithContract();
            const addFriendTx = await contract.addFriends(accountAddress, name);
            setLoading(true);
            await addFriendTx.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding friend. Please try again.");
        }
    };

    const sendMessage = async (msg, address) => {
        try {
            if (!msg || !address) return setError("Please type your message.");

            const contract = await connectingWithContract();
            const sendMessageTx = await contract.sendMessage(address, msg);
            setLoading(true);
            await sendMessageTx.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Please reload and try again.");
        }
    };

    const readUser = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const username = await contract.getUsername(userAddress);
            setCurrentUsername(username);
            setCurrentUserAddress(userAddress);
        } catch (error) {
            setError("Could not fetch user data.");
        }
    };

    return (
        <ChatAppContect.Provider
            value={{
                readMessage,
                createAccount,
                addFriend,
                sendMessage,
                readUser,
                connectWallet,
                checkIfWalletConnected,
                account,
                userName,
                friendsList,
                friendMsg,
                loading,
                userList,
                error,
                currentUsername,
                currentuserAddress,
            }}
        >
            {children}
        </ChatAppContect.Provider>
    );
};
