var interface = [{"constant":false,"inputs":[{"name":"username","type":"bytes32"}],"name":"sendETH","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"username","type":"bytes32"}],"name":"checkUser","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"username","type":"bytes32"},{"name":"message","type":"string"}],"name":"sendPrivateMessage","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"message","type":"string"}],"name":"sendMessage","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"username","type":"bytes32"},{"name":"publicKey","type":"string"}],"name":"registerUser","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"message","type":"string"}],"name":"BroadcastMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"message","type":"string"}],"name":"BroadcastPrivateMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"username","type":"bytes32"},{"indexed":false,"name":"publicKey","type":"string"},{"indexed":true,"name":"sender","type":"address"}],"name":"BroadcastNewUser","type":"event"}];
var contractAddress = "0x498af8b94eF86510770bc59Da91Ae4874cf05216";

window.ethereumService = {
  initialize: function(callback) {
    if(window.web3 == undefined) {
      console.log("Metamask not detected");
      return callback(false);
    }

    window.web3.eth.getTransaction('0xcf5240b6ed8ff000f3f537ab16839ff4ead6dffa19a6a4a4850dcc34d24d4b99', function(error, result) {
      // if(result == null) {
      //   console.log("Web3 error: " + error);
      //   return callback(false);
      // } else {
        window.web3.chatContract = window.web3.eth.contract(interface).at(contractAddress);
        console.log(window.web3.chatContract);
        callback(true);
      // }
    });
  },
	
	registerUser: function(callback) {
    web3.eth.sign(web3.eth.accounts[0], "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", function(error, result) {
    	var PassPhrase = "The Moon is a Harsh Mistress."; 
		var Bits = 1024; 

     	var privateKey = cryptico.generateRSAKey(PassPhrase, Bits);
	    var publicKey = cryptico.publicKeyString(privateKey);  

	    console.log("PRIVATE", privateKey);
	    console.log("PUBLIC", publicKey);

      var username = 'firstUser';

      window.web3.chatContract.registerUser(username, publicKey.toString(), function(error, result) {
        if(error) {
          console.log("Registration error: " + error);
          callback(error, null);
        } else {
          web3.eth.getBlockNumber(function(error, latestBlock) {
            if(error) {
              return callback(error, null);
            }

            var userData = {
              "username": username,
              "privateKey" : privateKey.toString(),
              "startingBlock" : latestBlock
            };

            callback(null, userData);
          });
        }
      });
    });
  },
   checkIfUserExists: function(callback) {
    var broadcastPublicKeyEvent = window.web3.chatContract.BroadcastNewUser({sender: web3.eth.accounts[0]}, {fromBlock: 0, toBlock: 'latest'});
    
    broadcastPublicKeyEvent.get(function(error, events) {
    	console.log("CHECK USER", events);
      if(!events.length) {
        return callback(null);
      } else {
        return callback({
          "emailAddress": web3.toAscii(events[0].args.username),
          "startingBlock" : events[0].blockNumber
        });
      };
    });
  },

watchForMessages: function(callback) {
    var sendEvent = window.web3.chatContract.BroadcastMessage();

    sendEvent.watch(function(error, event) {
      console.log("Got incoming messages" + JSON.stringify(event));
      callback(event);
    });

    return sendEvent;
  },
// Emit new email contract event
  writeMessage: function(message, callback) {
    window.web3.chatContract.sendMessage(message, function(error, result) {
      if (error) {
        console.log("Could not send message" + error);
        return callback("Could not execute message" + error, null);
      }

      console.log("sendEmail result is " + result);

      callback(null, result);
    });
  }
}

function callback () {
	window.connected = true;
}