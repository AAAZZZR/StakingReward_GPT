import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import { WagmiConfig, createClient, configureChains, mainnet, goerli } from "wagmi";
// import { alchemyProvider } from 'wagmi/providers/alchemy'

// import {
//   RainbowKitProvider
// } from '@rainbow-me/rainbowkit';


// const { chains, provider } = configureChains(
//   [mainnet,goerli],
//   [alchemyProvider({ apiKey: `${process.env.REACT_APP_ALCHEMY_API}` })]
// );

// const client = createClient({
//   autoConnect: true,
//   provider,
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
  
//     <WagmiConfig client={client}>
//       <RainbowKitProvider chains={chains}>
//         <App />
//       </RainbowKitProvider>
//     </WagmiConfig>
  
// );
