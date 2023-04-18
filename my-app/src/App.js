import { React, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ethers } from "ethers";
import Stake_Button from "./Stake_Button";
import "./App.css";
import Withdraw_Button from "./Withdraw_Button";

export default function App() {
  const { chains, provider } = configureChains(
    [mainnet, goerli],
    [alchemyProvider({ alchemyId: process.env.REACT_APP_ALCHEMY_API })]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <div className="header">
            <h1 className="title">Welcome to Stake2Earn</h1>
            <div style={{ position: "absolute", top: 20, right: 0 }}>
              <ConnectButton />
            </div>
          </div>
          <div className="button-container">
            <Stake_Button />
            <Withdraw_Button />
            <div></div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
