import { gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      id
      company
    }
  }
`;

export default GET_USER;
