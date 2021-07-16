import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Block } from './pages/Block'
import { Transactions } from './pages/Transactions'
import { NotificationsList } from './components/Transactions/History'
import { Alice } from './pages/Alice'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/alice" component={Alice} />
          <Route exact path="/block" component={Block} />
          <Route exact path="/transactions" component={Transactions} />
          <Redirect exact from="/" to="/alice" />
        </Switch>
      </BrowserRouter>
      <NotificationsList />
    </Page>
  )
}
