import gql from 'graphql-tag'

export const LIST_PRODUCT = gql`
  query Products($first: Int!, $after: Binary!) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          name
          description
          createdAt
        }
      }
    }
  }
`
