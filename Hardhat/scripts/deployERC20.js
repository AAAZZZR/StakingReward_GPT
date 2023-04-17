require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy staking token
  const StakingTokenFactory = await hre.ethers.getContractFactory("SimpleERC20");
  const stakingToken = await StakingTokenFactory.deploy("Staking Token", "STK", ethers.utils.parseEther("1000000"));
  await stakingToken.deployed();
  console.log("StakingToken deployed to:", stakingToken.address);

  // Deploy reward token
  const RewardTokenFactory = await hre.ethers.getContractFactory("SimpleERC20");
  const rewardToken = await RewardTokenFactory.deploy("Reward Token", "RWD", ethers.utils.parseEther("1000000"));
  await rewardToken.deployed();
  console.log("RewardToken deployed to:", rewardToken.address);

  // Deploy StakingReward contract
  const StakingRewardFactory = await hre.ethers.getContractFactory("StakingReward");
  const stakingReward = await StakingRewardFactory.deploy(stakingToken.address, rewardToken.address);
  await stakingReward.deployed();
  console.log("StakingReward deployed to:", stakingReward.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });