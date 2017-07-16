window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.log("Using MetaMask");

    window.web3 = new Web3(web3.currentProvider);

    window.ethereumService.initialize(callback);
  } else {
    console.log("Using local Ethereum node");

    const web3 = require('web3');
    var web3HttpProvider = new Web3.providers.HttpProvider("http://localhost:8545");

    if(web3HttpProvider.isConnected()) {
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    } else {
      console.log("Unable to connect to Web3 provider");
    }
  }
});