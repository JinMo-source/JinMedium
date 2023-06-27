import { gql } from "@apollo/client";

const UserFragment = gql`
  fragment UserFields on User {
    id
    username
    userEmail
    verified
    role
  }
`;

export const Get_User_Query = gql`
  query GetUser {
    user {
      ...UserFields
    }
  }
  ${UserFragment}
`;
