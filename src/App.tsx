import { useAccount } from 'wagmi'

import {
  useAppKit,
  useAppKitAccount,
  useAppKitEvents,
  useAppKitState,
} from '@reown/appkit/react'

export default function App() {
  const modal = useAppKit()
  const state = useAppKitState()
  const events = useAppKitEvents()
  return (
    <div>
      <button onClick={() => modal.open()}>Connect Wallet</button>
      <button onClick={() => modal.open({ view: 'Networks' })}>
        Choose Network
      </button>
      <WagmiHooks />
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </div>
  )
}

export function WagmiHooks() {
  const { address } = useAppKitAccount()
  const { isConnected, chainId } = useAccount()

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Address: {address}</p>
          <p>Chain ID: {chainId}</p>
        </div>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  )
}
