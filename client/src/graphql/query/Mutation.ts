import { gql } from "@apollo/client";

// Create Board Mutation
export const CREATE_BOARD = gql`
  mutation CreateBoard($input: OperationInput!) {
    CreateBoard(input: $input) {
      ok
      error
    }
  }
`;

// signUp
export const SiGNUP = gql`
  mutation signUp($input: UserInput!) {
    signUp(input: $input) {
      ok
      error
    }
  }
`;

//Login
export const VALIDATEUSER = gql`
  mutation validateUser($input: ValidateUser!) {
    validateUser(input: $input) {
      accessToken
    }
  }
`;
