import { CreateConnectorFn } from 'wagmi';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';

import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
    AppKitNetwork, bitcoin, bitcoinTestnet, mainnet, solana, solanaDevnet
} from '@reown/appkit/networks';
import { PhantomWalletAdapter, TrustWalletAdapter } from '@solana/wallet-adapter-wallets';

export const projectId = import.meta.env.VITE_PROJECT_ID
if (!projectId) throw new Error('Project ID is undefined')

export const metadata = {
  name: 'Multi Chain Wallet',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const connectors: CreateConnectorFn[] = []
connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
connectors.push(injected({ shimDisconnect: true }))
connectors.push(metaMask({}))

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  bitcoin,
  bitcoinTestnet,
  solana,
  solanaDevnet,
]
export const wagmiAdapter = new WagmiAdapter({
  networks: networks,
  projectId,
  connectors,
})

export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new TrustWalletAdapter()],
})

export const bitcoinAdapter = new BitcoinAdapter({
  projectId,
})
