import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($input: CreateBoardInput!) {
    createBoard(input: $input) {
      id
      title
      description
    }
  }
`;
