import gql from 'graphql-tag'
import MEMBER_FIELDS from '../fields/member'
import MEMBER_FRAGMENT from '../fragments/member'

export const MEMBERS = gql`
  query Members {
    members {
      ${MEMBER_FIELDS}
    }
  }
`

export const MEMBER = gql`
  query Node($nodeId: Binary!) {
    node(id: $nodeId) {
      id
      ...MemberFragment
    }
  }
  ${MEMBER_FRAGMENT}
`
