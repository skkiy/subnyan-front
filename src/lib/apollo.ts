import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { getAuth } from "firebase/auth"
import { setContext } from "@apollo/client/link/context"

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

  const httpLink = createHttpLink({
    uri: `${API_URL}/query`,
  })

  const authLink = setContext(async (_, { headers }) => {
    const auth = getAuth()
    if (!auth || !auth.currentUser) return headers
    const token = await auth.currentUser.getIdToken(true)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([authLink, httpLink, errorLink]),
    cache: new InMemoryCache(),
  })
}
