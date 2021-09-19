import "styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "lib/apollo"

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient()

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
