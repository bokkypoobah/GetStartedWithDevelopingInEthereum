pragma solidity ^0.8.0;

// ----------------------------------------------------------------------------
// Simple Vault
//
// https://github.com/bokkypoobah/GettingStartedInEthereum
//
// Deployed to Sepolia
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

contract SimpleVault {
    address public owner;

    event TokensDeposited(address indexed from, address indexed token, uint tokens);
    event TokensWithdrawn(address indexed to, address indexed token, uint tokens);

    modifier onlyOwner {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function depositTokens(address token, uint tokens) external {
        IERC20(token).transferFrom(msg.sender, address(this), tokens);
        emit TokensDeposited(msg.sender, token, tokens);
    }

    function withdrawTokens(address token, uint tokens) external onlyOwner {
        IERC20(token).transfer(msg.sender, tokens);
        emit TokensWithdrawn(msg.sender, token, tokens);
    }
}
