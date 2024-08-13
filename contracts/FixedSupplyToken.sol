/**
 *Submitted for verification at Etherscan.io on 2024-08-13
*/

pragma solidity ^0.8.0;

// ----------------------------------------------------------------------------
// Fixed Supply ERC-20 Token
//
// https://github.com/bokkypoobah/GettingStartedInEthereum
//
// Deployed to Sepolia 0x8fAF86fa6B137B316D699e23Ae1DcA3C12e7d093
//
// https://eips.ethereum.org/EIPS/eip-20
//
// SPDX-License-Identifier: MIT
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2024. The MIT Licence.
// ----------------------------------------------------------------------------

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

contract FixedSupplyToken is IERC20 {
    string public symbol;
    string public name;
    uint8 public decimals;
    uint _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    constructor() {
        symbol = "GMGMGM";
        name = unicode"Good Morning 👋, Good Morning 👋, Good Morning 👋";
        decimals = 18;
        _totalSupply = 1_000_000_000_000_000_000_000_000; // 1 million
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    function totalSupply() external view override returns (uint) {
        return _totalSupply - balances[address(0)];
    }
    function balanceOf(address owner) external view override returns (uint balance) {
        return balances[owner];
    }
    function transfer(address to, uint tokens) external override returns (bool success) {
        balances[msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    function approve(address spender, uint tokens) external override returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    function transferFrom(address from, address to, uint tokens) external override returns (bool success) {
        balances[from] -= tokens;
        allowed[from][msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(from, to, tokens);
        return true;
    }
    function allowance(address owner, address spender) external view override returns (uint remaining) {
        return allowed[owner][spender];
    }
}
