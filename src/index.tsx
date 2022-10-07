import React from 'react'
import ReactDOM from 'react-dom'
import { Config as DappProviderConfig, DAppProvider, Rinkeby } from '@usedapp/core'
import { App } from './App'

const PROVIDER_URL =
  'https://hardworking-clean-gas.rinkeby.discover.quiknode.pro/17628d541fafc8312c89998c94610cf3c76613de/'

const config: DappProviderConfig = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: PROVIDER_URL,
  },
  networks: [Rinkeby],
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
