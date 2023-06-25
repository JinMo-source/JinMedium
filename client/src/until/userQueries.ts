import { gql } from "@apollo/client";

export const Get_User_Query = gql`
  query GetUser {
    user {
      id
      username
      userEmail
      verified
      role
    }
  }
`;
