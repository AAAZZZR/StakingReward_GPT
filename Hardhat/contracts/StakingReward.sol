// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingReward is Ownable {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    struct Staker {
        uint256 stakedAmount;
        uint256 lastRewardClaim;
    }

    uint256 public rewardRate;
    uint256 public constant rewardDuration = 30 days;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => Staker) public stakers;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(IERC20 _stakingToken, IERC20 _rewardToken) {
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            Staker storage staker = stakers[account];
            staker.lastRewardClaim = earned(account);
        }
        _;
    }

    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0 tokens");

        Staker storage staker = stakers[msg.sender];
        staker.stakedAmount += amount;

        stakingToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0 tokens");

        Staker storage staker = stakers[msg.sender];
        require(staker.stakedAmount >= amount, "Not enough tokens staked");

        staker.stakedAmount -= amount;
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getReward() external updateReward(msg.sender) {
        uint256 reward = earned(msg.sender);
        if (reward > 0) {
            Staker storage staker = stakers[msg.sender];
            staker.lastRewardClaim = 0;
            rewardToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    function totalStaked() external view returns (uint256) {
        return stakingToken.balanceOf(address(this));
    }

    function earned(address account) public view returns (uint256) {
        Staker storage staker = stakers[account];
        uint256 calculatedRewardPerToken = rewardPerToken();
        return ((staker.stakedAmount * (calculatedRewardPerToken - staker.lastRewardClaim)) / 1e18) + staker.lastRewardClaim;
    }

    function rewardPerToken() public view returns (uint256) {
        if (stakingToken.balanceOf(address(this)) == 0) {
            return rewardPerTokenStored;
        }
        uint256 timeSinceLastUpdate = block.timestamp - lastUpdateTime;
        return rewardPerTokenStored + (((timeSinceLastUpdate * rewardRate) * 1e18) / stakingToken.balanceOf(address(this)));
    }
}
