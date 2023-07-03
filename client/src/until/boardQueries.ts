import { gql } from "@apollo/client";

const CombinedBoardFragment = gql`
  fragment CombiendBoardFields on CombinedBoard {
    title
    subTitle
    imagePath
  }
`;

const BoardFragment = gql`
  fragment BoardFields on Board {
    content
    createAt
  }
`;

export const GET_Recent_Board_Query = gql`
  query GetRecnetBoard {
    GetUser {
      ...CombiendBoardFields
    }
  }
  ${CombinedBoardFragment}
`;
