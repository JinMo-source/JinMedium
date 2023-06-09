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

//RefreshAccessToken

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

export interface ValidateUser {
  email: string!;
  password: string!;
}

// BOARD
export interface Board {
  ok: boolean;
  error?: string;
}

interface InsertInput {
  insertString?: Record<string, any> | null;
  insertObject?: Record<string, any> | null;
}

export interface Operation {
  insert?: Record<string, any> | null;
  delete?: number;
  retain?: number;
  attributes?: Record<string, any> | null;
}

export interface OperationOps {
  ops: Operation[];
}
export interface OperationFinally {
  title: string;
  ops: Operation[];
}
export interface OperationInput {
  input: OperationFinally;
}

//Combined Board
export interface CombinedBoardData {
  title: string;
  subTitle: string;
  imagePath: string;
}

export interface CombinedBoardInput {
  input: CombinedBoardData;
}

// Tags

export interface GetTagsData {
  tags: string[];
}

export interface GetTagsInput {
  input: GetTagsData;
}
