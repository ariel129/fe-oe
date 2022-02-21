import { FC } from 'react'
import { useRouter } from 'next/router'
import { Box, ButtonGroup, Container, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import AppTopbar from '@components/AppTopbar'
import MetaTags from '@components/MetaTags'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaBasketballBall } from 'react-icons/fa'

interface LayoutProps {
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  const router = useRouter()

  return (
    <Box>
      <Box boxShadow="0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.6)" width="full" bg="#fff">
        <AppTopbar />
      </Box>
      <Box width="full">
        <MetaTags title={title} />
        <Box w="full" bg="#E5E5E5">
          <Container maxW="container.xl">{children}</Container>
        </Box>
      </Box>
      {router.asPath !== '/login' && (
        <Stack
          display="flex"
          direction={{ base: 'column-reverse', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          maxWidth="1440px"
          margin="auto"
        >
          <Flex justifyContent="space-between" width="full" pl="5" minH="64px" align="center">
            <Box>
              <Text
                color="gray.400"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="normal"
                fontSize="sm"
                lineHeight="24px"
              >
                &copy; {new Date().getFullYear()} HOV Onboarding. All rights reserved.
              </Text>
            </Box>
            <Box>
              <ButtonGroup variant="ghost" color="gray.600">
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Facebook"
                  color="gray.400"
                  icon={<FaFacebook fontSize="20px" />}
                />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Instagra,"
                  color="gray.400"
                  icon={<FaInstagram fontSize="20px" />}
                />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Twitter"
                  color="gray.400"
                  icon={<FaTwitter fontSize="20px" />}
                />
                <IconButton as="a" href="#" aria-label="GitHub" color="gray.400" icon={<FaGithub fontSize="20px" />} />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="Basketball"
                  color="gray.400"
                  icon={<FaBasketballBall fontSize="20px" />}
                />
              </ButtonGroup>
            </Box>
          </Flex>
        </Stack>
      )}
    </Box>
  )
}

export default Layout
