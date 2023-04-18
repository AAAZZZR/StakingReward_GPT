import {React,useState} from 'react'
import { abi,Contract_address } from './Info';
import {
    useContractWrite,
    usePrepareContractWrite
  } from "wagmi";
  import './App.css'
  import { ethers } from "ethers";

const Stake_Button = () => {

    const [stakingAmount, setStakingAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const {config} = usePrepareContractWrite({
        address: `${Contract_address}`,
        abi: abi,
        functionName: 'stake',
      })
      const { data, isLoading, isSuccess, stake } = useContractWrite(config)
  return (
    <div>
        <button className='custom-button' onClick={stake}>Stake</button>
    </div>
  )
}
           {/* <div>
              <input
                type="number"
                value={stakingAmount}
                onChange={(e) => setStakingAmount(e.target.value)}
                placeholder="Amount to stake"
              />
              <button onClick={stake}>Stake</button>
            </div> */}

export default Stake_Button