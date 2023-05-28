export interface Board {
  id: number;
  title: string;
  description: string;
}

// FetchDataById
export interface FetchDataByIdInput {
  id: number;
}
export interface FetchDataById {
  ID: FetchDataByIdInput;
}
export interface EditBoardData {
  EditBoard: Board!;
}

// Create Board
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

//onst [createBoard] = useMutation<CreateBoardData, CreateBoardVariables>(
// Get Board

export interface GetBoardData {
  getBoard: [Board];
}
