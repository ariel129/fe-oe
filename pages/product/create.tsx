import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const create = () => {
  const router = useRouter()

  return (
    <Box h="calc(100vh - 154px)">
      <Box mt="90px">
        <Breadcrumb separator={<ChevronRightIcon color="#6B7280" />}>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/product')} color="gray.400">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" color="gray.400">
              Add Product
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box
        bg="#fff"
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems="flex-start"
        padding="30px"
        mt="18px"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
        borderRadius="8px"
        maxW="100%"
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text color="gray.700" lineHeight="24px" fontWeight={500} fontStyle="normal" fontSize={16}>
            Photo
          </Text>
          <Box
            width="375px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border="2px dashed #e5e7eb"
            boxSizing="border-box"
            borderRadius="6px"
            height="260px"
          >
            <Image src="/Path.png" />
            <Box display="flex" flexDirection="row" alignItems="center">
              <Text color="purple.600" fontStyle="normal" fontWeight={500} lineHeight="20px">
                Upload a file
              </Text>
              <Text color="gray.600" fontStyle="normal" fontWeight={500} lineHeight="20px" ml={1.5}>
                or drag and drop
              </Text>
            </Box>
            <Box mt="4px">
              <Text
                color="gray.500"
                fontStyle="normal"
                fontWeight="normal"
                fontSize="12px"
                lineHeight="16px"
                textAlign="center"
              >
                PNG, JPG, GIF up to 10MB
              </Text>
            </Box>
          </Box>
        </Box>
        <Box ml={{ sm: '40px' }} mt={{ sm: '20px', md: '0px' }} width="full">
          <FormControl>
            <Text color="gray.700" lineHeight="24px" fontWeight={500} fontStyle="normal" fontSize={16}>
              Title
            </Text>
            <Input placeholder="Enter Title" />
          </FormControl>
          <FormControl mt="20px">
            <Text color="gray.700" lineHeight="24px" fontWeight={500} fontStyle="normal" fontSize={16}>
              Description
            </Text>
            <Textarea placeholder="Enter Description" />
          </FormControl>
          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="flex-end"
            alignItems="center"
            mt="50px"
          >
            <Button bg="gray.100" mr={{ base: '0px', md: '20px' }} width={{ base: '100%', md: '20%', sm: '20%' }}>
              Cancel
            </Button>
            <Button
              bg="purple.500"
              color="#fff"
              mt={{ base: '5px', md: '0px' }}
              width={{ base: '100%', md: '20%', sm: '20%' }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default create
