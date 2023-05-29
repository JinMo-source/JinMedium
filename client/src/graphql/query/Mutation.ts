import { gql } from "@apollo/client";

// Create Board Mutation
export const CREATE_BOARD = gql`
  mutation CreateBoard($input: BoardInput!) {
    CreateBoard(input: $input) {
      ok
      error
    }
  }
`;

// Edit Board Mutation
export const EDIT_BOARD = gql`
  mutation EditBoard($input: BoardInput!) {
    EditBoard(input: $input) {
      ok
      error
    }
  }
`;

// Remove Board Mutation
export const DELETE_BOARD = gql`
  mutation DeleteBoard($ID: FetchDataById!) {
    DeleteBoard(ID: $ID) {
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
