// Cfreate Board
export interface CreateBoardInput {
  title: string;
  description: string;
}

export interface CreateBoardData {
  createBoard: {
    ok: boolean;
    error?: string;
  };
}

export interface CreateBoardVariables {
  input: CreateBoardInput;
}
// Get Board
export interface GetBoard {
  id: number;
  title: string;
  description: string;
}

export interface GetBoardData {
  getBoard: [GetBoard];
}
