import { useLazyQuery } from '@apollo/client'
import { NODE } from '@graphql/queries/node'
import { Product, QueryNodeArgs } from 'types'

const useNodeQuery = () => {
  const [getNode, { data, refetch, loading }] = useLazyQuery<{ node: Product }, QueryNodeArgs>(NODE, {
    variables: { id: '' },
  })

  return {
    getNode,
    data: data?.node || {},
    refetchNode: refetch,
    loadingNode: loading,
  }
}

export default useNodeQuery
