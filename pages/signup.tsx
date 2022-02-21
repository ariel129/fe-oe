import React, { useEffect, useRef } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'

import useSignUpMutation from '@hooks/mutations/useSignUpMutation'
import { login } from '@utils/authUtils'

const signup = () => {
  // useRef
  const password = useRef<HTMLInputElement>()

  // Mutation
  const { signUpAction } = useSignUpMutation()

  // RHF Hooks
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  password.current = watch('password', '')

  // handle Button function
  const onSubmit = async (data: FieldValues) => {
    const form = {
      input: {
        emailAddress: data.emailAddress,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
      },
    }

    try {
      const response: any = await signUpAction(form)

      login(response.data.signUp.token, '/product')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // useEffect
  useEffect(() => {
    setFocus('firstname')
  }, [setFocus])

  return (
    <Flex align="center" justify="center" bg="#E5E5E5">
      <Stack spacing={8} mx="auto" w="600px" py={12} px={6}>
        <Stack
          align="center"
          display="flex"
          bg="#fff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          rounded="lg"
          boxShadow="lg"
          pt={8}
          pb={8}
        >
          <Heading fontSize="4xl" mb="20px">
            Sign up
          </Heading>
          <Box w="full" height="1px" bg="gray.200" />
          <Stack spacing={4} w="full" py={{ base: 6 }} px={{ base: 8 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack flexDirection="column" spacing={4}>
                <FormControl isInvalid={errors?.firstname}>
                  <FormLabel>First name</FormLabel>
                  <Input
                    type="text"
                    placeholder="First name"
                    w="100%"
                    {...register('firstname', {
                      required: 'This field is required!',
                    })}
                  />
                  {errors?.firstname && <FormErrorMessage>{errors?.firstname?.message}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors?.lastname}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Last name"
                    w="100%"
                    {...register('lastname', {
                      required: 'This field is required!',
                    })}
                  />
                  {errors?.lastname && <FormErrorMessage>{errors?.lastname?.message}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors?.emailAddress}>
                  <FormLabel>Email</FormLabel>
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
                  {errors?.emailAddress && <FormErrorMessage>{errors?.emailAddress?.message}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors?.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="password"
                    w="100%"
                    {...register('password', {
                      required: 'This field is required!',
                      minLength: {
                        value: 6,
                        message: 'Password must have at least 6 characters',
                      },
                    })}
                  />
                  {errors?.password && <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors?.confirm_password}>
                  <FormLabel htmlFor="Confirm Password">Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    w="100%"
                    {...register('confirm_password', {
                      validate: (value) => value === password.current || "Password doesn't match",
                    })}
                  />
                  {errors?.confirm_password && <FormErrorMessage>{errors?.confirm_password?.message}</FormErrorMessage>}
                </FormControl>
                <Button bg="purple.500" color="white" type="submit">
                  Log in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default signup
