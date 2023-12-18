const getClientId = {
    getClientId: `
    query Clients($first: Int, $after: String, $filters: ClientFilters, $filterBy: ClientsFilterBy, $order: String, $orderBy: [ClientsOrderBy!]) {
        clients(
          first: $first
          after: $after
          filters: $filters
          filterBy: $filterBy
          order: $order
          orderBy: $orderBy
        ) {
          edges {
            node {
              id
              name
              firstName
              lastName
              mobile
              email
              isBanned
              __typename
            }
            __typename
          }
          pageInfo {
            endCursor
            hasNextPage
            __typename
          }
          totalCount
          __typename
        }
      }    
    `
}
module.exports = { getClientId }
