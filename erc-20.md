# Get Started With Developing In Ethereum - ERC-20

* Familiarise yourself with the ERC-20 fungible token standard
* Deploy your own ERC-20 token contract on the Ethereum Sepolia testnet
* Interact with your own ERC-20 token contract

<br />

---

## Table Of Contents

* [What is ERC-20?](#what-is-erc-20-)
* [Deploy Your Own ERC-20 Token Contract](#deploy-your-own-erc-20-token-contract)
* [Interact With Your Own ERC-20 Token Contract](#interact-with-your-own-erc-20-token-contract)

<br />

---

# What is ERC-20?

The ERC-20 fungible token standard https://eips.ethereum.org/EIPS/eip-20, originally proposed in Nov 2015 and finalised in [Apr 2018](https://github.com/ethereum/ERCs/commit/ef9dc7ece65fcf8c9858993073086c188a71f8ed), specifies a set of functions and events a smart contract must implement to be ERC-20 compliant.

Here are the events and functions mandated by the ERC-20 standard. From [contracts/FixedSupplyToken.sol](contracts/FixedSupplyToken.sol):
```solidity
// https://eips.ethereum.org/EIPS/eip-20
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed owner, address indexed spender, uint tokens);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint balance);
    function allowance(address owner, address spender) external view returns (uint remaining);

    function transfer(address to, uint tokens) external returns (bool success);
    function approve(address spender, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
}
```

Here is a simple implementation of a fixed supply ERC-20 token contact. From [contracts/FixedSupplyToken.sol](contracts/FixedSupplyToken.sol):
```solidity
contract FixedSupplyToken is IERC20 {
    string constant public symbol = "HIHIHI";
    string constant public name = unicode"Hi 👋, Hi 👋, Hi 👋";
    uint8 constant public decimals = 18;
    uint constant public _totalSupply = 1_000_000_000_000_000_000_000_000; // 1,000,000.000000000000000000

    // owner => tokens
    mapping(address => uint) public balanceOf;
    // owner => spender => tokens
    mapping(address => mapping(address => uint)) public allowance;

    constructor() {
        balanceOf[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    function totalSupply() external view override returns (uint) {
        return _totalSupply - balanceOf[address(0)];
    }
    function transfer(address to, uint tokens) external override returns (bool success) {
        balanceOf[msg.sender] -= tokens;
        balanceOf[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    function approve(address spender, uint tokens) external override returns (bool success) {
        allowance[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    function transferFrom(address from, address to, uint tokens) external override returns (bool success) {
        balanceOf[from] -= tokens;
        allowance[from][msg.sender] -= tokens;
        balanceOf[to] += tokens;
        emit Transfer(from, to, tokens);
        return true;
    }
}
```


<br />

---

# Deploy Your Own ERC-20 Token Contract

<br />

---

Interact With Your Own ERC-20 Token Contract


<br />

<br />

Enjoy!

(c) BokkyPooBah / Bok Consulting Pty Ltd 2024. The MIT Licence.
