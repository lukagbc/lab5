pragma solidity ^0.6.11;

contract Token {
    mapping(address => uint256) public balances;
    uint256 weiPerToken;
    address owner;

    event TokenBought(address buyer, uint256 amount);

    constructor(uint256 tokenPrice) public {
        owner = msg.sender;
        weiPerToken = tokenPrice;
    }

    function buy() public payable {
        balances[msg.sender] = balances[msg.sender] + (msg.value / weiPerToken);
        emit TokenBought(msg.sender, msg.value / weiPerToken);
    }

    function transfer(uint256 amount, address to) public {
        require(
            amount < checkBalance(msg.sender),
            "you should have enough balance"
        );
        balances[to] = balances[to] + amount;
        balances[msg.sender] = balances[msg.sender] - amount;
    }

    function checkBalance(address account) public view returns (uint256) {
        return balances[account];
    }

    function updateTokenprice(uint256 tokenPrice) public {
        require(msg.sender == owner, "must be owner");
        weiPerToken = tokenPrice;
    }
}
