import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, defineChain, sepolia } from '@reown/appkit/networks';

const projectId = import.meta.env['VITE_REOWN_PROJECT_ID'];
if (!projectId) {
  throw new Error('VITE_REOWN_PROJECT_ID is not set');
}

const ethersAdapter = new EthersAdapter();

// Define the custom network
const hardhat = defineChain({
  id: 31337,
  name: 'Hardhat',
  caipNetworkId: 'eip155:31337',
  chainNamespace: 'eip155',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_HARDHAT_RPC_URL],
      webSocket: [import.meta.env.VITE_HARDHAT_WS_RPC_URL],
    },
  },
});

createAppKit({
  adapters: [ethersAdapter],
  projectId,
  networks: [process.env.NODE_ENV === 'Production' ? mainnet : process.env.NODE_ENV === 'Preview' ? sepolia : hardhat],
  defaultNetwork:
    process.env.NODE_ENV === 'Production' ? mainnet : process.env.NODE_ENV === 'Preview' ? sepolia : hardhat,
  metadata: {
    name: 'EFOTASK',
    description: 'A telegram bot for earn from online tasks',
    url: import.meta.env.VITE_PUBLIC_URL,
    icons: [`${import.meta.env.VITE_PUBLIC_URL}/assets/favicon.png`],
  },
  features: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
  },
});

const ContextProvider = ({ children }) => {
  return <>{children}</>;
};

export default ContextProvider;
