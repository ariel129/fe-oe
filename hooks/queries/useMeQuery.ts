import { useLazyQuery } from '@apollo/client'
import { ME } from '@graphql/queries/me'
import { Account } from 'types'

const useMeQuery = () => {
  const [getMe, { data, refetch, loading }] = useLazyQuery<{ me: Account }>(ME)

  return {
    getMe,
    me: data?.me,
    refetchMe: refetch,
    loadingMe: loading,
  }
}

export default useMeQuery
