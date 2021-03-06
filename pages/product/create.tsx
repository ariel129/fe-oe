import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, useToast } from '@chakra-ui/react'

import { BreadCrumb, FormInput, UploadImage } from '@components/Product'
import useProductMutation from '@hooks/mutations/useProductMutation'
import { withAuthSync } from '@utils/authUtils'
import { useProductsQuery } from '@hooks/queries'
import { Product } from 'types'

type Input = Pick<Product, 'name' | 'description'>

const Create: React.FC = () => {
  const router = useRouter()
  const toast = useToast()

  // Query / Mutation
  const { createAction } = useProductMutation()
  const { refetchProduct } = useProductsQuery()

  // RHF Hooks
  const { register, handleSubmit, setFocus, reset } = useForm<Input>({ mode: 'onChange' })

  // handle Button function
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const form = { input: data }

    // Try/Catch
    try {
      const response = await createAction(form)
      if (response.data?.createProduct.id) {
        refetchProduct()
        toast({
          title: 'Create Product',
          description: `You've successfully created.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        reset()
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // useEffect
  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  useEffect(() => {
    console.log('TOAST')
    if (typeof window !== 'undefined') {
      toast({
        title: 'Create Product',
        description: `You've successfully created.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [window])

  return (
    <Box p="10" minH="calc(100vh - 128px)">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box w="full" mt={{ base: '40px', md: '90px' }}>
          <BreadCrumb next="Add Product" link="/product" />
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
                onClick={() => router.push('/product')}
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

export default withAuthSync(Create)
