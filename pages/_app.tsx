import { ApolloProvider } from '@apollo/client'
import { Box, ChakraProvider } from '@chakra-ui/react'
import Layout from '@components/Layout'
import client from '@graphql/apolloClient'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import theme from 'theme'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Head>
      <title>{process.env.appName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Box>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Layout title="HOV">
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </Box>
  </ApolloProvider>
)

export default App
