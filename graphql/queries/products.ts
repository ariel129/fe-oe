import gql from 'graphql-tag'

export const LIST_PRODUCT = gql`
  query Products($after: Binary) {
    products(after: $after) {
      edges {
        cursor
        node {
          id
          name
          description
          createdAt
          owner {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        totalCount
      }
    }
  }
`
