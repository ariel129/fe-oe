import gql from 'graphql-tag'

export const ACCOUNT = gql`
  query Account {
    account {
      id
      name
      email
      role
      timezone
      onboardingStep
      type
    }
  }
`
