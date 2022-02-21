import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonProps,
  Heading,
  SimpleGrid,
  Skeleton,
  useToast,
} from '@chakra-ui/react'
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Paginator, Container, usePaginator, PageGroup } from 'chakra-paginator'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import { Card as PCard } from '@components/Product'
import { useMeQuery, useProductsQuery } from '@hooks/queries'
import useProductMutation from '@hooks/mutations/useProductMutation'
import { getClientAccessToken } from '@utils/authUtils'
import { getUserID, setUserID } from '@reducer/userReducer'

const baseStyles: ButtonProps = {
  w: 7,
  fontSize: 'sm',
}
const activeStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: 'white',
    borderTop: 0,
    rounded: 'sm',
  },
  bg: '#E5E5E5',
  borderTop: '1px solid indigo',
  borderTopWidth: 2,
  borderRadius: 0,
  color: 'indigo',
}

const normalStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: 'white',
    borderTop: 0,
    rounded: 'sm',
  },
  bg: '#E5E5E5',
}

const Products = () => {
  const toast = useToast()

  // Token
  const token = getClientAccessToken()

  // useRef / useState
  const cancelRef: any = React.useRef()
  const [deleteId, setDeleteID] = useState<string>('')

  // State / Dispatch
  const dispatch = useDispatch()
  const user_id = useSelector(getUserID)

  // Query / Mutation
  const { data, pageInfo, refetchProduct, loadingProduct, fetchMoreProduct } = useProductsQuery()
  const { deleteAction } = useProductMutation()
  const { getMe } = useMeQuery()

  const { isDisabled, pagesQuantity, currentPage } = usePaginator({
    total: data.length,
    initialState: {
      pageSize: 5,
      currentPage: 1,
      isDisabled: false,
    },
  })

  // handle Button function
  const onClose = () => {
    setDeleteID('')
  }

  const onDelete = async () => {
    try {
      const response = await deleteAction({ input: { id: deleteId } })

      if (response.data?.deleteProduct) {
        refetchProduct()
        toast({
          title: 'Delete Product',
          description: `You've successfully deleted.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setDeleteID('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onDialog = async (id: string) => {
    setDeleteID(id)
  }

  const onPageChange = (key: string, id: string) => {
    fetchMoreProduct({
      variables: { [key]: id },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        const edges = fetchMoreResult?.products.edges
        const pageInfo = fetchMoreResult?.products.pageInfo
        return edges?.length
          ? {
              products: {
                __typename: fetchMoreResult?.products.__typename,
                edges,
                pageInfo,
              },
            }
          : prev
      },
    })
  }

  useEffect(() => {
    ;(async function getData() {
      if (token) {
        const response = await getMe()
        dispatch(setUserID({ user_id: response.data?.me.id }))
      } else {
        dispatch(setUserID({ user_id: '' }))
      }
    })()
  }, [token])

  return (
    <Box p={{ base: 4, md: 10 }} minH="calc(100vh - 128px)">
      <Box w="full">
        <Box display="flex" justifyContent="space-between">
          <Heading size="lg" fontFamily="Inter" fontStyle="normal" fontWeight="bold">
            Products
          </Heading>
          {token && (
            <Link href="/product/create">
              <Button bg="purple.500" color="white" _hover={{ bg: 'gray.400' }}>
                <AddIcon mr="4px" w={3} />
                Add Product
              </Button>
            </Link>
          )}
        </Box>
        <Box h="1px" mt="20px" bg="gray.300" />
      </Box>
      <Box maxW="7xl" mx="auto" py={{ base: '6', md: '8', lg: '12' }}>
        <SimpleGrid
          columns={{ base: Math.min(1, 4), md: Math.min(3, 4), lg: Math.min(5, 4), xl: Math.min(5, 4) }}
          columnGap={{ base: '4', md: '6' }}
          rowGap={{ base: '8', md: '10' }}
        >
          {data.map((product: any, index: number) => (
            <Skeleton key={index} isLoaded={!loadingProduct}>
              <PCard details={product} user_id={user_id} handleDialog={onDialog} />
            </Skeleton>
          ))}
        </SimpleGrid>
      </Box>
      <Box h="1px" mt="20px" bg="gray.300" />
      <Box justifyContent="space-between" display="flex" mt="2">
        <Paginator
          isDisabled={isDisabled}
          activeStyles={activeStyles}
          innerLimit={2}
          currentPage={currentPage}
          outerLimit={2}
          normalStyles={normalStyles}
          pagesQuantity={pagesQuantity}
          onPageChange={() => {}}
        >
          <Container align="center" justify="space-between" w="full" p={4}>
            <Button isDisabled={!pageInfo.hasPreviousPage} onClick={() => onPageChange('before', pageInfo.startCursor)}>
              <ArrowBackIcon mr="2" />
              Previous
            </Button>
            <PageGroup isInline align="center" />
            <Button isDisabled={!pageInfo.hasNextPage} onClick={() => onPageChange('after', pageInfo.endCursor)}>
              Next <ArrowForwardIcon ml="2" />
            </Button>
          </Container>
        </Paginator>
      </Box>
      {!!deleteId === true && (
        <AlertDialog isOpen={!!deleteId} leastDestructiveRef={cancelRef} onClose={() => {}}>
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
                <Button colorScheme="red" onClick={onDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Box>
  )
}

export default Products
