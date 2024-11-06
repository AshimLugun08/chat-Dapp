// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApps {
    struct Friend {
        address pubkey;
        string name;
    }
    
    struct AlluserStrusk {
        string name;
        address accountAddress;
    }

    struct User {
        string name;
        Friend[] friendList;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    AlluserStrusk[] public getAllusers; // Changed to public for easier acces
    mapping(address => User) private userlist;
    mapping(bytes32 => Message[]) private allMessage;

    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(userlist[pubkey].name).length > 0;
    }

    function createAccount(string calldata name) external {
        require(!checkUserExist(msg.sender), "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userlist[msg.sender].name = name;
        getAllusers.push(AlluserStrusk(name, msg.sender));
    }
    function getUsername(address pubkey)external view returns (string memory){
        require(checkUserExist(pubkey),"user is not registed");
        return userlist[pubkey].name;
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool) {
        if (userlist[pubkey1].friendList.length > userlist[pubkey2].friendList.length) {
            (pubkey1, pubkey2) = (pubkey2, pubkey1);
        }

        for (uint i = 0; i < userlist[pubkey1].friendList.length; i++) {
            if (userlist[pubkey1].friendList[i].pubkey == pubkey2) {
                return true;
            }
        }
        return false;
    }

    function addFriends(address friend_key, string calldata friend_name) external {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(friend_key != msg.sender, "User cannot add themselves as friends");
        require(!checkAlreadyFriends(msg.sender, friend_key), "These users are already friends");

        _addFriends(msg.sender, friend_key, friend_name);
        _addFriends(friend_key, msg.sender, userlist[msg.sender].name);
    }

    function _addFriends(address me, address friend_key, string memory friend_name) private {
        Friend memory newFriend = Friend(friend_key, friend_name);
        userlist[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns (Friend[] memory) {
        return userlist[msg.sender].friendList;
    }

    function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32) {
        return pubkey1 < pubkey2 
            ? keccak256(abi.encodePacked(pubkey1, pubkey2)) 
            : keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friends with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        Message memory newMsg = Message(msg.sender, block.timestamp, _msg);
        allMessage[chatCode].push(newMsg);
    }

    function readMessage(address friend_key) external view returns (Message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessage[chatCode];
    }
 
    function getAllAppUser() public view returns (AlluserStrusk[] memory) {
        return getAllusers;
    }
}
