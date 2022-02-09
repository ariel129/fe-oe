import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '@graphql/mutations/authenticate'
import { SignUpInput, MutationSignUpArgs } from 'types'

const useSignUpMutation = () => {
  const [signup] = useMutation<{ authenticate: SignUpInput }, MutationSignUpArgs>(AUTHENTICATE)

  const signUpAction = async (variables: MutationSignUpArgs) => {
    return signup({
      variables,
    })
  }

  return { signUpAction }
}

export default useSignUpMutation
