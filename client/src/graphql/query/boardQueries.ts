import { gql } from "@apollo/client";

// Create Board Mutation
export const CREATE_BOARD = gql`
  mutation CreateBoard($input: CreateBoardInput!) {
    createBoard(input: $input) {
      ok
      error
    }
  }
`;

// All Board Query
export const GET_BOARD = gql`
  query {
    getBoard {
      id
      title
      description
    }
  }
`;

// Find Board ID Mutation
export const EDIT_BOARD = gql`
  query EditBoard($ID: FetchDataById!) {
    EditBoard(ID: $ID) {
      id
      title
      description
    }
  }
`;
