import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';

import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { metadata, networks, projectId, solanaWeb3JsAdapter, wagmiAdapter } from './config';

const queryClient = new QueryClient()

createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks: networks,
  metadata: metadata,
  projectId: projectId,
  features: {
    analytics: true,
    email: false,
    socials: [],
    emailShowWallets: false,
  },
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709', // OKx
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // trust
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393', // phantom
  ],
  excludeWalletIds: [],
  // allWallets: 'HIDE',
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
