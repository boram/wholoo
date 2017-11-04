import 'phoenix_html'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import SignUp from 'pages/SignUp'

const csrfToken = document.getElementsByName('csrf-token')[0].content
const baseUrl = `${document.location.protocol}//${document.location.host}`
const apiUrl = `${baseUrl}/api`
const networkInterface = createNetworkInterface({
  uri: apiUrl,
  opts: {
    credentials: 'same-origin',
    headers: { 'X-CSRF-Token': csrfToken },
  },
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
})

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route path="/signup" component={SignUp} />
    </Router>
  </ApolloProvider>
)

const appRoot = document.getElementById('app-root')

ReactDOM.render(<App />, appRoot)

