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

The ERC-20 fungible token standard at https://eips.ethereum.org/EIPS/eip-20, originally proposed in Nov 2015 and finalised in [Apr 2018](https://github.com/ethereum/ERCs/commit/ef9dc7ece65fcf8c9858993073086c188a71f8ed), specifies a set of functions and events a smart contract must implement to be ERC-20 compliant.

##### FixedSupplyToken.sol

Following are snippets from a simple ERC-20 compliant fixed supply token contract, from [contracts/FixedSupplyToken.sol](contracts/FixedSupplyToken.sol).

The following `IERC20` interface specifies the events and functions required for a smart contract to be compliant with https://eips.ethereum.org/EIPS/eip-20.

```solidity
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

The following `FixedSupplyToken` contract implements the ERC-20 interface above.

Note that the Solidity compiler automatically generates the getter functions for public variables: `name()`, `symbol()`, `decimals()`, `balanceOf(owner)` and `allowance(owner, spender)`.

```
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

> Screenshots below can be reproduced using the contract address `0x1e5df6db242d07cc40a37b634022c02f73a74d59` on the page https://bokkypoobah.github.io/GetStartedWithDevelopingInEthereum/, in a web3 enabled web browser.



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
