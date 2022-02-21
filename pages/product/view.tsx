import React from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ChevronRightIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { UploadImage } from '@components/Product'

import { MdShoppingCart } from 'react-icons/md'

const view = () => {
  const router = useRouter()

  return (
    <Box p="10" minH="calc(100vh - 128px)">
      <form>
        <Box w="full" mt={{ base: '40px', md: '90px' }}>
          <Breadcrumb separator={<ChevronRightIcon color="#6B7280" />}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.push('/product')} color="gray.400">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="gray.400">
                Sample
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }} alignItems="flex-start" mt="18px" maxW="100%">
          <Stack display="flex" flexDirection="column" alignItems="flex-start" w={{ base: '100%', md: 'sm', sm: 'sm' }}>
            <UploadImage src="/media_placeholder.png" />
            <Button
              bg="purple.50"
              color="purple.500"
              width="100%"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="semibold"
              lineHeight="28px"
            >
              <Icon as={MdShoppingCart} mr="10px" />
              Add to cart
            </Button>
          </Stack>
          <Box ml={{ sm: '40px' }} mt={{ base: '20px', sm: '0px' }} width="full">
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Text
                color="gray.700"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="30px"
                lineHeight="120%"
              >
                React JS
              </Text>
              <HStack>
                <IconButton
                  bg="gray.100"
                  aria-label="edit-icon"
                  icon={<EditIcon color="gray.700" />}
                  onClick={() => {}}
                />
                <IconButton
                  bg="gray.100"
                  aria-label="edit-icon"
                  icon={<DeleteIcon color="gray.700" />}
                  onClick={() => {}}
                />
              </HStack>
            </Box>
            <Text
              color="gray.700"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="16px"
              lineHeight="24px"
            >
              Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus
              quidem ipsam quia iusto. Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia
              omnis voluptatem. Minus quidem ipsam quia iusto.Repudiandae sint consequuntur vel. Amet ut nobis explicabo
              numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.Repudiandae sint consequuntur vel.
              Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.Repudiandae
              sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam
              quia iusto.
            </Text>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default view
