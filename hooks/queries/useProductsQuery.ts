import { useQuery } from '@apollo/client'
import { LIST_PRODUCT } from '@graphql/queries/products'
import { ProductConnection, QueryProductsArgs } from 'types'

const useProductsQuery = () => {
  const { data, refetch, loading, fetchMore } = useQuery<{ products: ProductConnection }, QueryProductsArgs>(
    LIST_PRODUCT
  )

  return {
    data: data?.products.edges || [],
    pageInfo: data?.products.pageInfo || {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '',
      endCursor: '',
      totalCount: 0,
    },
    refetchProduct: refetch,
    loadingProduct: loading,
    fetchMoreProduct: fetchMore,
  }
}

export default useProductsQuery
