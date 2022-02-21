import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, useToast } from '@chakra-ui/react'
import { BreadCrumb } from '@components/Product/BreadCrumb'
import { FormInput, UploadImage } from '@components/Product'
import useNodeQuery from '@hooks/queries/useNodeQuery'
import useProductMutation from '@hooks/mutations/useProductMutation'
import { withAuthSync } from '@utils/authUtils'
import { prodID } from '@reducer/productsReducer'
import { Product } from 'types'
import { useProductsQuery } from '@hooks/queries'

type Input = Pick<Product, 'name' | 'description'>

const edit = () => {
  const router = useRouter()
  const toast = useToast()
  // State / Dispatch
  const dispatch = useDispatch()
  const product_id = useSelector((state: any) => state.products.product_id)

  // Query / Mutation
  const { updateAction } = useProductMutation()
  const { refetchProduct } = useProductsQuery()
  const { getNode } = useNodeQuery()

  // useForm
  const { register, handleSubmit, setFocus, setValue, reset } = useForm<Input>({ mode: 'onChange' })

  // handle Button function
  const onCancel = () => {
    router.push('/product')
    dispatch(prodID({ product_id: '' }))
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const form = { input: { id: product_id, body: { ...data } } }

    try {
      const response = await updateAction(form)

      if (response.data?.updateProduct.id) {
        refetchProduct()
        toast({
          title: 'Update Product',
          description: `You've successfully updated.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        reset()
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  // useEffect
  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  useEffect(() => {
    ;(async function getData() {
      if (product_id) {
        const response = await getNode({ variables: { id: product_id } })

        const setUpdate: Input = {
          name: response.data?.node.name ? response.data.node.name : '',
          description: response.data?.node.description ? response.data.node.description : '',
        }

        Object.entries(setUpdate).forEach(([name, value]) => setValue(name as keyof Input, value))
      }
    })()
  }, [product_id])

  return (
    <Box p="10" minH="calc(100vh - 128px)">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box w="full" mt={{ base: '40px', md: '90px' }}>
          <BreadCrumb next="Edit Product" link="/product" />
        </Box>
        <Box
          bg="#fff"
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="flex-start"
          padding="30px"
          mt="18px"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          maxW="100%"
          rounded="lg"
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start" w={{ base: '100%', md: 'sm', sm: 'sm' }}>
            <UploadImage />
          </Box>
          <Box ml={{ sm: '40px' }} mt={{ base: '20px', sm: '0px' }} width="full">
            <FormInput register={register} />
            <Box
              display="flex"
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent="flex-end"
              alignItems="center"
              mt="50px"
            >
              <Button
                bg="gray.100"
                mr={{ base: '0px', md: '20px' }}
                width={{ base: '100%', md: '20%', sm: '20%' }}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                bg="purple.500"
                color="#fff"
                mt={{ base: '5px', md: '0px' }}
                width={{ base: '100%', md: '20%', sm: '20%' }}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default withAuthSync(edit)
