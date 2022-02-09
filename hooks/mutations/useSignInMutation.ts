import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '@graphql/mutations/authenticate'
import { AuthenticateInput, MutationAuthenticateArgs } from 'types'

const useSignInMutation = () => {
  const [authenticate] = useMutation<{ authenticate: AuthenticateInput }, MutationAuthenticateArgs>(AUTHENTICATE)

  const authenticateAction = async (variables: MutationAuthenticateArgs) => {
    return authenticate({
      variables,
    })
  }

  return { authenticateAction }
}

export default useSignInMutation
