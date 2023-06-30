import { gql } from "@apollo/client";

const UserFragment = gql`
  fragment UserFields on User {
    id
    username
    email
  }
`;

export const GET_USER_QUERY = gql`
  query Get_User {
    GetUser {
      ...UserFields
    }
  }
  ${UserFragment}
`;
