import ApolloClient, { createNetworkInterface } from 'apollo-client'

const configureNetworkInterface = () => {
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

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}
        }
        const authToken = window.localStorage.getItem('authToken')
        if (authToken) {
          req.options.headers.authorization = `Bearer ${authToken}`
        } else {
          delete req.options.headers.authorization
        }
        next()
      },
    },
  ])

  return networkInterface
}

const createApolloClient = () =>
  new ApolloClient({
    networkInterface: configureNetworkInterface(),
    dataIdFromObject: o => o.id,
  })

export default createApolloClient
