import { FC, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useSignInMutation } from '@hooks/mutations'
import { login } from '@utils/authUtils'

const Login: FC = () => {
  const { authenticateAction } = useSignInMutation()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data: any) => {
    const form = { input: data }

    try {
      const response: any = await authenticateAction(form)

      login(response.data.authenticate.token, '/product')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    setFocus('emailAddress')
  }, [setFocus])

  return (
    <Flex h="calc(100vh - 56px)" align={'center'} justify={'center'} bg="#E5E5E5">
      <Stack spacing={8} mx={'auto'} w="600px" py={12} px={6}>
        <Stack
          align={'center'}
          display="flex"
          bg="#fff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          rounded={'lg'}
          boxShadow={'lg'}
          pt={8}
          pb={8}
        >
          <Heading fontSize={'4xl'} mb={'20px'}>
            Log in
          </Heading>
          <Box w="full" height="1px" bg="gray.200" />
          <Stack spacing={4} w="full" px={6} pt="40px" pb="20px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors?.emailAddress?.message}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  w="100%"
                  {...register('emailAddress', {
                    required: 'This field is required!',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors?.emailAddress?.message ? (
                  <FormErrorMessage>{errors?.emailAddress?.message}</FormErrorMessage>
                ) : errors?.email?.type === 'pattern' ? (
                  <FormErrorMessage>{errors?.emailAddress?.message}</FormErrorMessage>
                ) : (
                  ''
                )}
              </FormControl>
              <FormControl isInvalid={errors?.password?.message} mt="20px">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="*******"
                  w="100%"
                  {...register('password', { required: 'This field is required!' })}
                />
                {errors?.emailAddress?.message && <FormErrorMessage>{errors?.emailAddress?.message}</FormErrorMessage>}
              </FormControl>
              <Text mt="8px" textAlign="right" color="#805AD5" fontWeight={600} fontSize={14} fontStyle="normal">
                Forgot Password
              </Text>
              <Button mt="40px" w="100%" bgColor="#805AD5" color="#fff" type="submit">
                Log in
              </Button>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Login
