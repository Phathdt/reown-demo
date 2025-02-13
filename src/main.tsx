import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';

import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import {
    bitcoinAdapter, metadata, networks, projectId, solanaWeb3JsAdapter, wagmiAdapter
} from './config';

const queryClient = new QueryClient()

createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter, bitcoinAdapter],
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
