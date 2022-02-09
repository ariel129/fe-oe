import gql from 'graphql-tag'
import { BASIC_DETAILS } from '../fields/member'

export const ME = gql`
  query Me {
    me {
      ${BASIC_DETAILS}
    }
  }
`
