import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  foundry,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from '@wagmi/core/chains';
import { http, createConfig } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumGoerli.id]: http(),
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [fantom.id]: http(),
    [fantomTestnet.id]: http(),
    [foundry.id]: http(),
    [goerli.id]: http(),
    [optimism.id]: http(),
    [optimismGoerli.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
  },
});