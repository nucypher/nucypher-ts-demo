import React from 'react'
import ReactDOM from 'react-dom'
import { Config as DappProviderConfig, DAppProvider, Mumbai, Polygon, Mainnet } from '@usedapp/core'
import { App } from './App'

const config: DappProviderConfig = {
  networks: [
    Mumbai,
    Polygon,
    Mainnet, // TODO: Remove
  ],
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
