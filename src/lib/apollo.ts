import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, useApolloClient } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

const API_URL = "http://localhost:8080"

export const createApolloClient = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      })
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = new HttpLink({ uri: `${API_URL}/query` })

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  })
}
