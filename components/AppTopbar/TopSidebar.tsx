import { FC } from 'react'
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Heading,
  Stack,
  Popover,
  PopoverTrigger,
  Link,
  IconButton,
  useDisclosure,
  Collapse,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Badge,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AddIcon, CloseIcon, HamburgerIcon, MinusIcon } from '@chakra-ui/icons'
import { FiBell } from 'react-icons/fi'
import { MdShoppingCart } from 'react-icons/md'

import { getUserID } from '@reducer/userReducer'
import { logout } from '@utils/authUtils'
import { addProducts, deleteProducts, getProducts, removeProducts } from '@reducer/productsReducer'

const TopSidebar: FC = () => {
  const router = useRouter()
  const { isOpen, onToggle } = useDisclosure()

  // State / Dispatch
  const UserId = useSelector(getUserID)
  const Products = useSelector(getProducts)
  const dispatch = useDispatch()

  const onLogout = () => {
    logout()
  }

  let Total = Products.reduce((RTotal, product) => RTotal + product.qty, 0)

  return (
    <Box justifyContent="space-between" alignItems="center" maxWidth="1440px" margin="auto" minH="64px">
      <Flex justifyContent="space-between" width="full" pl="5" margin="auto" align="center">
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          margin="auto"
          minH="64px"
          alignItems="center"
        >
          <Box cursor="pointer" onClick={() => router.push('/')}>
            <Image src="/Mark.png" alt="hov_img" objectFit="cover" />
          </Box>
          <Box display={{ base: 'none', md: 'flex' }} cursor="pointer" onClick={() => router.push('/')}>
            <Heading size="md" ml="10px">
              workflow
            </Heading>
          </Box>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={10}
            minH="64px"
            alignItems="center"
            borderBottom="4px"
            borderColor="#6366f1"
          >
            <Stack direction={'row'} spacing={4}>
              <Box>
                <Popover trigger={'hover'} placement={'bottom-start'}>
                  <PopoverTrigger>
                    <Link
                      p={2}
                      fontSize={'sm'}
                      fontWeight={500}
                      color="gray.500"
                      _hover={{ textDecoration: 'none' }}
                      onClick={() => router.push('/product')}
                    >
                      Products
                    </Link>
                  </PopoverTrigger>
                </Popover>
              </Box>
            </Stack>
          </Flex>
        </Flex>

        {!UserId ? (
          <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={4}>
            <Button
              color="gray.700"
              fontSize={'sm'}
              fontStyle="normal"
              fontWeight={600}
              variant="outline"
              onClick={() => router.push('/login')}
            >
              Log in
            </Button>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontWeight={600}
              fontSize={'sm'}
              bg="purple.500"
              color="white"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </Button>
          </Stack>
        ) : (
          <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={4}>
            <Stack direction={'row'} spacing={4} position="relative">
              <Badge
                fontSize="0.6em"
                h={4}
                right={0}
                position="absolute"
                zIndex={1}
                borderRadius={8}
                bg="purple.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {Total}
              </Badge>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="cart-icon"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  icon={<MdShoppingCart size={24} />}
                />
                <MenuList>
                  <Box>
                    <Flex display="flex" flexDirection="column" px={{ base: 4 }} py={{ base: 2 }}>
                      {Products.map((item) => {
                        let price = 100
                        return (
                          <Box key={item.id} py={{ base: 2 }}>
                            <Flex justifyContent="space-between">
                              <Box display="flex" flexDirection="column" justifyContent="center" w="auto">
                                <Box display="flex" flexDirection="row">
                                  <Box px={{ base: 2 }}>
                                    <Image src="/image.png" boxSize="40px" />
                                  </Box>
                                  <Box>
                                    <Text color="gray.800" fontFamily="Inter" fontStyle="normal" wordBreak="break-word">
                                      {item.name}
                                    </Text>
                                    <Text color="gray.600" fontSize="xs" fontFamily="Inter" fontStyle="normal">
                                      Price: ${price}
                                    </Text>
                                  </Box>
                                </Box>
                              </Box>
                              <Box display="flex" flexDirection="column">
                                <IconButton
                                  variant="outline"
                                  isRound
                                  size="xs"
                                  aria-label="add-icon"
                                  icon={<AddIcon />}
                                  onClick={() =>
                                    dispatch(
                                      addProducts({ id: item.id, name: item.name, description: item.description })
                                    )
                                  }
                                />
                                <Text fontSize="xs" textAlign="center">
                                  {item.qty}
                                </Text>
                                <IconButton
                                  variant="outline"
                                  isRound
                                  size="xs"
                                  aria-label="add-icon"
                                  icon={<MinusIcon />}
                                  onClick={() => {
                                    if (item.qty === 1) {
                                      dispatch(deleteProducts({ id: item.id }))
                                    } else {
                                      dispatch(removeProducts({ id: item.id }))
                                    }
                                  }}
                                />
                              </Box>
                            </Flex>
                          </Box>
                        )
                      })}
                      <Box display="flex" justifyContent="flex-end">
                        <Text color="gray.800" fontWeight={600} fontFamily="Inter" fontStyle="normal">
                          Subtotal: $100
                        </Text>
                      </Box>
                    </Flex>
                    <Flex px={{ base: 4 }} justifyContent="space-between">
                      <Button variant="outline" size="sm">
                        View Cart
                      </Button>
                      <Button bg="purple.500" color="white" size="sm">
                        Checkout
                      </Button>
                    </Flex>
                  </Box>
                </MenuList>
              </Menu>
            </Stack>
            <IconButton
              aria-label="notification-icon"
              bg="white"
              _hover={{ bg: 'white' }}
              icon={<FiBell size={24} />}
            />
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
          <MobileItem />
        </Stack>
      </Collapse>
    </Box>
  )
}

const MobileItem = () => {
  const { onToggle } = useDisclosure()
  const router = useRouter()

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          onClick={() => router.push('/product')}
        >
          Products
        </Text>
      </Flex>
    </Stack>
  )
}
export default TopSidebar
