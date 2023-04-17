import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { WagmiProvider, WagmiConnect } from '@wagmi/eth';
import StakingReward from './abis/StakingReward.json';

const App = () => {
  const [contract, setContract] = useState(null);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const stakingReward = new ethers.Contract(STAKING_REWARD_ADDRESS, StakingReward.abi, signer);
        setContract(stakingReward);
      }
    };
    init();
  }, []);

  const handleStake = async () => {
    if (!contract || !stakingAmount) return;
    const tx = await contract.stake(ethers.utils.parseUnits(stakingAmount, 'ether'));
    await tx.wait();
    alert('Staked successfully');
  };

  const handleWithdraw = async () => {
    if (!contract || !withdrawAmount) return;
    const tx = await contract.withdraw(ethers.utils.parseUnits(withdrawAmount, 'ether'));
    await tx.wait();
    alert('Withdrawn successfully');
  };

  return (
    <WagmiProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Staking Reward</h1>
        <WagmiConnect />
      </div>
      <div>
        <input
          type="number"
          value={stakingAmount}
          onChange={(e) => setStakingAmount(e.target.value)}
          placeholder="Amount to stake"
        />
        <button onClick={handleStake}>Stake</button>
      </div>
      <div>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Amount to withdraw"
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </WagmiProvider>
  );
};

export default App;

