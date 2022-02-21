import { useMutation } from '@apollo/client'
import { SIGN_UP } from '@graphql/mutations/signup'
import { SignUpInput, MutationSignUpArgs } from 'types'

const useSignUpMutation = () => {
  const [signup] = useMutation<{ authenticate: SignUpInput }, MutationSignUpArgs>(SIGN_UP)

  const signUpAction = async (variables: MutationSignUpArgs) => {
    return signup({
      variables,
    })
  }

  return { signUpAction }
}

export default useSignUpMutation
