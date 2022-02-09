import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'

import { BsThreeDotsVertical } from 'react-icons/bs'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { withAccessToken, withAuthSync } from '@utils/authUtils'

const data = [
  {
    id: '0194fdd498b3fa3113c488ec17207fcf',
    name: 'I have been created to be edited 1',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: '0194fdd498b3fa3113c488ec17207fc2',
    name: 'I have been created to be edited 2',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: '0194fdd498b3fa3113c488ec17207fc3',
    name: 'I have been created to be edited 2',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
]

interface ProdProps {
  token?: string
}

const Products: React.FC<ProdProps> = ({ token }) => {
  const ref: any = React.useRef()
  const cancelRef: any = React.useRef()
  const [isOpen, setOpen] = useState<string>('')
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const router = useRouter()

  const onClose = () => {
    setOpen('')
    setIsDialog(false)
  }
  const handleOpen = (id: string) => {
    setOpen('')
    if (isOpen !== id) {
      setOpen(id)
    }
  }

  const handleDialog = (id: string) => {
    setOpen('')
    setIsDialog(true)
  }

  console.log(token)
  return (
    <>
      {/* // <Box p="10" h="calc(100vh - 64px)"> */}
      <Box p="10">
        <Box w="full">
          <Box display="flex" justifyContent="space-between">
            <Heading size="lg" fontFamily="Inter" fontStyle="normal" fontWeight="bold">
              Products
            </Heading>
            <Button onClick={() => router.push('/product/create')}>
              <AddIcon mr="4px" />
              Add Product
            </Button>
          </Box>
          <Box h="1px" mt="20px" bg="gray.300" />
        </Box>
        <Box w="full" mt="50px" pb="10px">
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {data.map((item: any, index: number) => (
              <GridItem
                key={index}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)"
                borderRadius="8px"
                bg="#fff"
              >
                <Flex flexDirection="column" alignItems="flex-start" w="full" position="relative">
                  <Image src="" fallbackSrc="https://via.placeholder.com/150" boxSize="full" borderTopRadius={8} />
                  <IconButton
                    aria-label="three dots"
                    icon={<BsThreeDotsVertical />}
                    borderRadius="20px"
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={() => handleOpen(item.id)}
                  />
                  <Box
                    ref={ref}
                    display={`${isOpen === item.id ? 'flex' : 'none'}`}
                    position="absolute"
                    width="60%"
                    bg="#fff"
                    flexDirection="column"
                    alignItems="flex-start"
                    boxShadow="0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    borderRadius="6px"
                    top={14}
                    right={2}
                    padding="8px"
                  >
                    <List cursor="pointer" w="full">
                      <ListItem
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="normal"
                        lineHeight="20px"
                        color="#374151"
                      >
                        Edit
                      </ListItem>
                      <ListItem
                        fontFamily="Inter"
                        fontStyle="normal"
                        fontWeight="normal"
                        lineHeight="20px"
                        color="#374151"
                        mt="16px"
                        onClick={() => handleDialog(item.id)}
                      >
                        Delete
                      </ListItem>
                    </List>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-start" p="20px" w="full">
                    <Heading size="md" mt="10px">
                      {item.name}
                    </Heading>
                    <Text mt="8px">{item.description}</Text>
                    <Button mt="18px" w="100%" bg="purple.50" color="purple.700">
                      Add to cart
                    </Button>
                  </Box>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Box>
        <Box h="1px" mt="20px" bg="gray.300" />
        <Box justifyContent="space-between" display="flex" mt="2">
          <Button bg="#E5E5E5">
            <ArrowBackIcon mr="2" />
            Previous
          </Button>
          <Button bg="#E5E5E5">
            Next <ArrowForwardIcon ml="2" />
          </Button>
        </Box>
        {isDialog === true && (
          <AlertDialog isOpen={isDialog} leastDestructiveRef={cancelRef} onClose={() => {}}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete product
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure you want to delete this product? You can't undo this action afterwards.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={onClose} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Box>
    </>
  )
}

export default withAuthSync(Products)
