import { gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      id
      name
      email
      avatarUrl
      bio
      company
      login
      location
      createdAt
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
      socialAccounts(last: 5) {
        edges {
          node {
            provider
            displayName
          }
        }
      }
      repositories(last: 6) {
        nodes {
          id
          name
          description
          url
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
          forks {
            totalCount
          }
        }
      }
    }
  }
`;

export default GET_USER;
