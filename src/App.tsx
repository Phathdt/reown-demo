import {
    useAppKit, useAppKitAccount, useAppKitEvents, useAppKitNetwork, useAppKitState, useDisconnect
} from '@reown/appkit/react';

import { networks } from './config';

export default function App() {
  const modal = useAppKit()
  const state = useAppKitState()
  const events = useAppKitEvents()
  const { switchNetwork } = useAppKitNetwork()

  return (
    <div>
      <button onClick={() => switchNetwork(networks[0])}>
        Switch to mainnet
      </button>
      <button onClick={() => switchNetwork(networks[1])}>
        Switch to bitcoin
      </button>
      <button onClick={() => switchNetwork(networks[2])}>
        Switch to bitcoin testnet
      </button>
      <button onClick={() => switchNetwork(networks[3])}>
        Switch to solana
      </button>
      <button onClick={() => switchNetwork(networks[4])}>
        Switch to solana devnet
      </button>
      <button onClick={() => modal.open()}>Connect Wallet</button>
      <button onClick={() => modal.open({ view: 'Networks' })}>
        Choose Network
      </button>
      <WalletInfo />
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </div>
  )
}

export function WalletInfo() {
  const { address, caipAddress, isConnected, status } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Address: {address}</p>
          <p>caipAddress: {caipAddress}</p>
          <p>status: {status}</p>

          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  )
}
