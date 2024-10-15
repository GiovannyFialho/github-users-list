import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers($query: String!, $first: Int!) {
    search(query: $query, type: USER, first: $first) {
      edges {
        node {
          ... on User {
            id
            name
            email
            avatarUrl
            bio
            company
            login
          }
        }
      }
    }
  }
`;

export default GET_USERS;
