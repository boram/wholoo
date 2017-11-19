import 'phoenix_html'
import 'theme/globalStyles'

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createApolloClient from 'config/createApolloClient'

import SignUp from 'pages/SignUp'
import LogIn from 'pages/LogIn'
import Dashboard from 'pages/Dashboard'

const App = () => (
  <ApolloProvider client={createApolloClient()}>
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  </ApolloProvider>
)

const appRoot = document.getElementById('app-root')

ReactDOM.render(<App />, appRoot)

