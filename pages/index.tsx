import { Flex, Spinner } from '@chakra-ui/react'
import { FC, Suspense } from 'react'

const Home: FC = () => (
  <Suspense
    fallback={
      <Flex h="100vh" w="full" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    }
  >
    <Flex p={8} alignItems="center" justifyContent="center"></Flex>
  </Suspense>
)

export default Home
