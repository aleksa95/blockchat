pragma solidity ^0.4.0;

contract Messanger {
    
    mapping (bytes32 => address) usernameAddress;
    
    event BroadcastMessage(address sender, string message);
    event BroadcastPrivateMessage(address sender, address receiver, string message); 
    event BroadcastNewUser(bytes32 username, string publicKey, address indexed sender);
    
    function registerUser(bytes32 username, string publicKey) returns (bool) {
          
        if (0 != usernameAddress[username]) {
           throw;
        }

        usernameAddress[username] = msg.sender;
        
        BroadcastNewUser(username, publicKey, msg.sender);

        return true;
    }
     
    function sendMessage(string message) returns (bool) {
        BroadcastMessage(msg.sender, message);
        
        return true;
    }
    
    function checkUser(bytes32 username) returns (address) {
        if (0 == usernameAddress[username]) {
            throw;
        }
        
        return usernameAddress[username];
    }
    
    function sendETH(bytes32 username) payable returns (bool) {
        if (0 == usernameAddress[username]) {
            msg.sender.transfer(msg.value);
            
            throw;
        }
        
        usernameAddress[username].transfer(msg.value);
        
        return true;
    }
    
    function sendPrivateMessage(bytes32 username, string message) returns (bool) {
        if (0 == usernameAddress[username]) {
            throw;
        }
        
        BroadcastPrivateMessage(msg.sender, usernameAddress[username], message);
        
        return true;
    }
    
}
