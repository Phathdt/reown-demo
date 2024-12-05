import './styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { CreateConnectorFn, WagmiProvider } from 'wagmi'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {
  AppKitNetwork,
  base,
  bitcoin,
  mainnet,
  solana,
} from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

const queryClient = new QueryClient()

const projectId = import.meta.env.VITE_PROJECT_ID
if (!projectId) throw new Error('Project ID is undefined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const connectors: CreateConnectorFn[] = []
connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
connectors.push(injected({ shimDisconnect: true }))
connectors.push(metaMask({}))

const chains: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  solana,
  bitcoin,
  base,
]
const wagmiAdapter = new WagmiAdapter({
  networks: chains,
  projectId,
  connectors,
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: chains,
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: [],
    emailShowWallets: false,
  },
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  ], // OKX
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
