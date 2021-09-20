import "styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"

import { createApolloClient } from "lib/apollo"

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient()

  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
