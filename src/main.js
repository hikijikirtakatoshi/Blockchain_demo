import "babel-polyfill";
import Web3 from "web3";
import Hello from '../build/contracts/Hello.json';

var smartContractAddress = "0x9cC8f00e54BB2F63662847D06cd20F04cF355B39";

let myAccount;
let web3;
let contractInstance;

async function initApp() {
  myAccount = (await web3.eth.getAccounts())[0];
  contractInstance = new web3.eth.Contract(Hello.abi, smartContractAddress);
}

window.changeMessage = async () => {
  const msgString = document.getElementById("value").value;

  if(!msgString){
    return window.alert("文字列を入力してください");
  }

  try {
    let option = {
      from: myAccount,
      gasPrice: "20000000000",
      gas: "41000",
    };
    await contractInstance.methods.changeMessage(msgString).send(option);
    document.getElementById("value").value = "";

  } catch (err) {
    console.log(err);
  }
};

window.getMessage = async () => {
  try {
    const result = await contractInstance.methods.getMessage().call();
    document.getElementById("message").innerText = result;
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('load', async function() {
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    let provider = window['ethereum'] || window.web3.currentProvider;

    await provider.enable();

    web3 = new Web3(provider);
  } else {
   
    console.log('METAMASK NOT DETECTED');
  }

  initApp();
});