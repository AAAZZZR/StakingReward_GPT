require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

const { ALCHEMY_API, PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API}`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: "0.8.0",
};