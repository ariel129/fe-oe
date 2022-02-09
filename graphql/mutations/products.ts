import gql from 'graphql-tag'

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductBody!) {
    updateProduct(input: $input) {
      id
    }
  }
`

export const DELETE_PRODUCT = gql``
