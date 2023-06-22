import { gql } from "@apollo/client";

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
export const BOARD_DFETCH_BY_DATA_ID = gql`
  query BoardFetchByDataId($ID: FetchDataById!) {
    BoardFetchByDataId(ID: $ID) {
      id
      title
      description
    }
  }
`;

// RefreshToken
