// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop {

    address public tokenAddress;
    uint256 public recipientMaxTokenLimit = 25000000000000000000000;
    uint256 public airdropFee = 0.0001 ether; 
    address public owner;

    mapping(address => uint256) public claimedAmounts; 
    mapping(address => bool) public hasClaimed;
    mapping(address => uint256) public reffEarning;

    uint public total= 0;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
         owner = msg.sender;
    }

    function ClaimAirdropRefer(
        address recipient,
        address referral,
        uint256 amount
    ) public payable {
        require(!hasClaimed[recipient], "Wallet has already claimed");
        require(IERC20(tokenAddress).balanceOf(address(this)) >= amount , "Not enough tokens");
        require (claimedAmounts[recipient] == 0);
        if (amount > recipientMaxTokenLimit) {
            amount= recipientMaxTokenLimit;
        }
        require(msg.value == airdropFee, "Insufficient fee");
        uint256 referralAmount = amount / 10;
        IERC20(tokenAddress).transfer(recipient, amount);
        claimedAmounts[recipient] += amount;

        if (referral != address(0)) {
            IERC20(tokenAddress).transfer(referral, referralAmount);
        }

        payable(owner).transfer(airdropFee);
        emit AirdropCompleted(recipient, amount);
        emit ReferralAirdropCompleted(referral, referralAmount);
        hasClaimed[recipient] = true;
        total= total + referralAmount + amount;
        reffEarning[referral]= reffEarning[referral]+ referralAmount;
    }

    function ClaimAirdropNoRefer(
        address recipient,
        uint256 amount
    ) public payable {
        require(!hasClaimed[recipient], "Wallet has already claimed");
        require(IERC20(tokenAddress).balanceOf(address(this)) >= amount , "Not enough tokens");
        if (amount > recipientMaxTokenLimit) {
            amount= recipientMaxTokenLimit;
        }
        require(msg.value == airdropFee, "Insufficient fee");
        IERC20(tokenAddress).transfer(recipient, amount);
        claimedAmounts[recipient] += amount;
        payable(owner).transfer(airdropFee);
        emit AirdropCompleted(recipient, amount);
        hasClaimed[recipient] = true;
        total= total + amount;
    }

    function withdrawAllTokens() public  {
        require (msg.sender == owner, "not owner");
        uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        IERC20(tokenAddress).transfer(owner, balance);
    }

    event AirdropCompleted(address recipient, uint256 amount);
    event ReferralAirdropCompleted(address referral, uint256 amount);
}
