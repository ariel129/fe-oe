import { useMutation } from '@apollo/client'
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '@graphql/mutations/products'
import {
  Product,
  DeleteProductInput,
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
  MutationDeleteProductArgs,
} from 'types'

const useProductMutation = () => {
  const [createProduct] = useMutation<{ createProduct: Product }, MutationCreateProductArgs>(CREATE_PRODUCT)
  const [updateProduct] = useMutation<{ updateProduct: Product }, MutationUpdateProductArgs>(UPDATE_PRODUCT)
  const [deleteProduct] = useMutation<{ deleteProduct: DeleteProductInput }, MutationDeleteProductArgs>(DELETE_PRODUCT)

  const createAction = async (variables: MutationCreateProductArgs) => {
    return createProduct({
      variables,
    })
  }

  const updateAction = async (variables: MutationUpdateProductArgs) => {
    return updateProduct({ variables })
  }

  const deleteAction = async (variables: MutationDeleteProductArgs) => {
    return deleteProduct({ variables })
  }

  return { createAction, updateAction, deleteAction }
}

export default useProductMutation
