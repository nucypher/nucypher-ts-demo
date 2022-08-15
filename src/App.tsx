import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { NotificationsList } from './components/Transactions/History'
import { DemoAliceGrants } from './pages/DemoTDecConditions'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/alice-grants" component={DemoAliceGrants} />
          <Redirect exact from="/" to="/alice-grants" />
        </Switch>
      </BrowserRouter>
      <NotificationsList />
    </Page>
  )
}
