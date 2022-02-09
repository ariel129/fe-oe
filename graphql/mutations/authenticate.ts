import gql from 'graphql-tag'

export const AUTHENTICATE = gql`
  mutation ($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
`
