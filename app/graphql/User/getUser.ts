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
    }
  }
`;

export default GET_USER;
