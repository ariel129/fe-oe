import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@components/Layout'
import client from '@graphql/apolloClient'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import theme from 'theme'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Head>
      <title>{process.env.appName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout title="HOV">
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  </ApolloProvider>
)

export default App
