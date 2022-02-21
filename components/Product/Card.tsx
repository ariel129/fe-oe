import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  AspectRatio,
  Box,
  Button,
  Icon,
  IconButton,
  Image,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdShoppingCart } from 'react-icons/md'

import { addProducts, prodID } from '@reducer/productsReducer'

interface Details {
  node: {
    id: string
    name: string
    description: string
    owner: {
      id: string
    }
  }
}
interface Props {
  details: Details
  user_id: string
  handleDialog: (id: string) => void
}

export const Card: React.FC<Props> = ({ details, user_id, handleDialog }) => {
  //  Props
  const {
    id,
    name,
    description,
    owner: { id: ownerID },
  } = details.node
  const router = useRouter()

  // State
  const [isOpen, setOpen] = useState<string>('')

  // Dispatch
  const dispatch = useDispatch()

  const onOpen = (id: string) => {
    setOpen('')
    if (isOpen !== id) {
      setOpen(id)
    }
  }

  return (
    <Stack
      spacing={useBreakpointValue({ base: '4', md: '5' })}
      bg="#fff"
      rounded="lg"
      position="relative"
      onClick={() => {}}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src="https://via.placeholder.com/150"
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderTopRadius={useBreakpointValue({ base: 'md', md: 'lg' })}
          />
        </AspectRatio>
        {ownerID === user_id && (
          <IconButton
            aria-label="three dots"
            icon={<BsThreeDotsVertical />}
            borderRadius="20px"
            position="absolute"
            top={2}
            right={2}
            onClick={() => onOpen(id)}
          />
        )}
        <Box position="absolute" top="3rem" right="8rem" mt="0.5rem">
          <Popover
            isOpen={isOpen === id}
            onClose={() => setOpen('')}
            placement="bottom"
            variant="responsive"
            id="popoverdasdsa"
          >
            <PopoverContent bg="#fff" w="120px">
              <PopoverBody>
                <List cursor="pointer" w="full">
                  <TextList
                    title="Edit"
                    onClick={() => {
                      router.push('/product/edit')
                      dispatch(prodID({ product_id: id }))
                    }}
                  />
                  <TextList title="Delete" onClick={() => handleDialog(id)} mt="10px" />
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
      <Stack pl={3} pr={3} overflowY="auto" h={200}>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {name}
          </Text>
          <Text mt="8px" fontWeight="normal" color={useColorModeValue('gray.700', 'gray.400')}>
            {description}
          </Text>
        </Stack>
      </Stack>
      <Stack align="center" pl={3} pr={3} pb={3} position="relative" bottom={0}>
        <Button
          colorScheme="blue"
          isFullWidth
          bg="purple.50"
          color="purple.700"
          _hover={{ bg: 'red.200', color: 'white' }}
          onClick={() => dispatch(addProducts({ id, name, description }))}
        >
          <Icon as={MdShoppingCart} mr="10px" />
          Add to cart
        </Button>
      </Stack>
    </Stack>
  )
}

interface TextProps {
  title: string
  onClick: () => void
  mt?: string
}

const TextList: React.FC<TextProps> = ({ title, onClick, ...props }) => (
  <ListItem
    fontFamily="Inter"
    fontStyle="normal"
    fontWeight="normal"
    lineHeight="20px"
    color="gray.700"
    onClick={onClick}
    _hover={{ bg: 'blue.200', color: 'white' }}
    {...props}
  >
    {title}
  </ListItem>
)
