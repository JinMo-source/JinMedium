// COMMON
export interface Board {
  id?: number;
  title: string;
  description: string;
}

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

export interface BoardVariables {
  input: Board;
}

// OUTPUT
export interface CoreOutPut {
  ok: boolean;
  error?: string;
}

export interface BoardOutput {
  Output: CoreOutPut;
}

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
  accessToken: string;
}
