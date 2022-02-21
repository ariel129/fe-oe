import React from 'react'
import { FormControl, Input, Text, Textarea } from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'
import { Product } from 'types'

type Input = Pick<Product, 'name' | 'description'>

interface Props {
  register: UseFormRegister<Input>
}

export const FormInput: React.FC<Props> = ({ register }) => {
  return (
    <>
      <FormControl>
        <Text color="gray.700" lineHeight="24px" fontWeight={500} fontStyle="normal" fontSize={16}>
          Title
        </Text>
        <Input placeholder="Enter Title" {...register('name')} />
      </FormControl>
      <FormControl mt="20px">
        <Text color="gray.700" lineHeight="24px" fontWeight={500} fontStyle="normal" fontSize={16}>
          Description
        </Text>
        <Textarea placeholder="Enter Description" {...register('description')} />
      </FormControl>
    </>
  )
}
