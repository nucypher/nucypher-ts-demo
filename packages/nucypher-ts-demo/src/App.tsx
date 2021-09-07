import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { NotificationsList } from './components/Transactions/History'
import { Alice } from './pages/Alice'
import { Bob } from './pages/Bob'
import { Enrico } from './pages/Enrico'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/alice" component={Alice} />
          <Route exact path="/bob" component={Bob} />
          <Route exact path="/enrico" component={Enrico} />
          <Redirect exact from="/" to="/alice" />
        </Switch>
      </BrowserRouter>
      <NotificationsList />
    </Page>
  )
}
