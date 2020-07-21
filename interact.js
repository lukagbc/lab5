const ethers = require("ethers");
const config = require("./config.json");

const abi = [
  {
    inputs: [{ internalType: "uint256", name: "tokenPrice", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenBought",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "checkBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenPrice", type: "uint256" }],
    name: "updateTokenprice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const provider = ethers.getDefaultProvider(config["network"]);

const wallet = new ethers.Wallet(config["privateKey"], provider);
console.log(`Loaded wallet ${wallet.address}`);

const contract = new ethers.Contract(config.contractAddress, abi, wallet);

(async () => {
  let tx = await contract.functions.buy({
    value: ethers.utils.parseEther("0.1"),
  });
  console.log(tx);
})();

// const wallet = new ethers.Wallet.createRandom();

// console.log(wallet.publicKey, wallet.privateKey);
