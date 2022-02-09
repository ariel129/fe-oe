import gql from 'graphql-tag'

export const SIGN_UP = gql`
  mutation ($input: SignUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`
