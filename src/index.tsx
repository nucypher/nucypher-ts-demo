import React from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, Config, Mumbai, Polygon } from '@usedapp/core'

import { App } from './App'

const config: Config = {
  networks: [Polygon, Mumbai],
  readOnlyUrls: {
    [Polygon.chainId]: 'https://rpc-mainnet.maticvigil.com',
    [Mumbai.chainId]: 'https://rpc-mumbai.maticvigil.com',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
