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

const bytecode =
  "60806040523480156100115760006000fd5b506040516106c13803806106c1833981810160405260208110156100355760006000fd5b81019080805190602001909291905050505b33600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060016000508190909055505b5061009b565b610617806100aa6000396000f3fe60806040526004361061004e5760003560e01c806327e235e3146100545780635f515226146100bb5780638b70b35014610122578063a6f2ae3a1461015f578063b7760c8f146101695761004e565b60006000fd5b3480156100615760006000fd5b506100a5600480360360208110156100795760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101c6565b6040518082815260200191505060405180910390f35b3480156100c85760006000fd5b5061010c600480360360208110156100e05760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101e1565b6040518082815260200191505060405180910390f35b34801561012f5760006000fd5b5061015d600480360360208110156101475760006000fd5b8101908080359060200190929190505050610235565b005b61016761030d565b005b3480156101765760006000fd5b506101c46004803603604081101561018e5760006000fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061042e565b005b60006000506020528060005260406000206000915090505481565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610230565b919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f6d757374206265206f776e65720000000000000000000000000000000000000081526020015060200191505060405180910390fd5b8060016000508190909055505b50565b6001600050543481151561031d57fe5b04600060005060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505401600060005060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508190909055507fa3a187cfc249a33f6c4046e8d418886eea8564f9dd214a32aa5ba08d9602b54333600160005054348115156103e257fe5b04604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b565b61043d336101e163ffffffff16565b821015156104b6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f796f752073686f756c64206861766520656e6f7567682062616c616e6365000081526020015060200191505060405180910390fd5b81600060005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505401600060005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081909090555081600060005060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505403600060005060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508190909055505b505056fea26469706673582212200d57c8979c3120d8c2377b2fedb51e9a4da07af6ef7a131421aac79669e119c064736f6c634300060b0033";

const provider = ethers.getDefaultProvider(config["network"]);

const wallet = new ethers.Wallet(config["privateKey"], provider);
console.log(`Loaded wallet ${wallet.address}`);

(async () => {
  console.log(`\nDeploying contract in ${config["network"]}...`);

  let factory = new ethers.ContractFactory(abi, bytecode, wallet);

  let contract = await factory.deploy(10);
  console.log(
    `contract ${contract.address} deployed by ${contract.deployTransaction}`
  );
})();

// const wallet = new ethers.Wallet.createRandom();

// console.log(wallet.publicKey, wallet.privateKey);
