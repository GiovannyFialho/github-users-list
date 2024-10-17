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
      socialAccounts(first: 5) {
        edges {
          node {
            provider
            displayName
          }
        }
      }
    }
  }
`;

export default GET_USER;
