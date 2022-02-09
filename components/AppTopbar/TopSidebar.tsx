import React from 'react'
import { Box, Flex, Text, Button, Image, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const TopSidebar = () => {
  const router = useRouter()

  return (
    <Box boxShadow="0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.6)" width="full" bg="#fff">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={0}
        maxWidth="1440px"
        margin="auto"
        height="64px"
        left={0}
        right={0}
      >
        <Flex justifyContent="space-between" width="full">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box>
              <Image src="/Mark.png" alt="hov_img" objectFit="cover" />
            </Box>
            <Box>
              <Heading size="md" ml="10px">
                workflow
              </Heading>
            </Box>
            <Box>
              <Text size="sm" ml="28px" color="gray.500" cursor="pointer" onClick={() => router.push('/product')}>
                Products
              </Text>
            </Box>
          </Box>
          {/* {!token && (*/}
          <Box display="flex" flexDirection="row" alignItems="center">
            <Button variant="outline" onClick={() => router.push('/login')}>
              Log in
            </Button>
            <Button bg="purple.500" color="white" ml={4}>
              Sign up
            </Button>
          </Box>
          {/* )} */}
        </Flex>
      </Box>
    </Box>
  )
}

export default TopSidebar
