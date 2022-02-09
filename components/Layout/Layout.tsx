import { Box, Container, Flex } from '@chakra-ui/react'
import AppTopbar from '@components/AppTopbar'
import MetaTags from '@components/MetaTags'
import { FC } from 'react'

interface LayoutProps {
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <AppTopbar />
      <Flex>
        <MetaTags title={title} />
        <Box w="full" bg="#E5E5E5">
          <Container maxW="container.xl">{children}</Container>
        </Box>
      </Flex>
    </>
  )
}

export default Layout
