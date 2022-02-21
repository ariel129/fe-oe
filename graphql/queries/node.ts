import gql from 'graphql-tag'

export const NODE = gql`
  query Node($id: Binary!) {
    node(id: $id) {
      ... on Product {
        id
        name
        description
      }
    }
  }
`
