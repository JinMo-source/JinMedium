import { gql } from "@apollo/client";

export const GET_INITIAL_DATA = gql`
  query GetInitialData {
    GetRecentBoard {
      content
    }

    # combinedBoards {
    #   id
    #   title
    #   // CombinedBoard에 필요한 다른 필드들을 여기에 추가합니다.
    # }

    # users {
    #   id
    #   name
    #   // User에 필요한 다른 필드들을 여기에 추가합니다.
    # }
  }
`;

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
