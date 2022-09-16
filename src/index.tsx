import React from 'react'
import ReactDOM from 'react-dom'
import { Config as DappProviderConfig, DAppProvider } from '@usedapp/core'
import { App } from './App'

const config: DappProviderConfig = {
  // TODO: Set supported networks  
  // networks: [
  // Mumbai,
  // Polygon,
  // ],
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
