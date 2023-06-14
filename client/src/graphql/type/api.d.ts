// COMMON

export interface UserInput {
  username: string!;
  password: string!;
  email: string!;
}

export interface UserVariables {
  input: User;
}
export interface UserOutput {
  Output: CoreOutPut;
}
// INPUT

// OUTPUT

// FIND BY Id
export interface FetchDataByIdInput {
  id: number;
}
export interface FetchDataById {
  ID: FetchDataByIdInput;
}

// Detail Board
export interface Board_Fetch_Data_By_Id {
  BoardFetchByDataId: Board!;
}

// All BOARD
export interface GetBoardData {
  getBoard: [Board];
}

// Login
export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginVariables {
  input: LoginInput;
}

export interface ValidateUser {
  email: string!;
  password: string!;
}

export interface AccessToken {
  validateUser: {
    accessToken: string;
  };
}

// BOARD
export interface Board {
  ok: boolean;
  error?: string;
}
export interface Operation {
  insert?: { [key: string]: any };
  delete?: number;
  retain?: number;
  attributes?: { [key: string]: any };
}

export interface OperationOps {
  ops: Array<{
    Operation;
  }>;
}
export interface OperationInput {
  delta: Operation[];
}
