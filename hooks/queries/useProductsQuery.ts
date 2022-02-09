import { useQuery } from '@apollo/client'
import { LIST_PRODUCT } from '@graphql/queries/products'
import { ProductConnection, QueryProductsArgs } from 'types'

const useProductsQuery = () => {
  const { data, refetch, loading } = useQuery<{ products: ProductConnection }, QueryProductsArgs>(LIST_PRODUCT, {
    variables: {
      first: 1,
      after: 10,
    },
  })

  return {
    data: data?.products.edges,
    refetchMe: refetch,
    loadingMe: loading,
  }
}

export default useProductsQuery
