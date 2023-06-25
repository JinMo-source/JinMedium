export enum UserRole {
  admin = "admin",
  writer = "writer",
}

export interface User {
  id: number;
  userEmail: string;
  username: string;
  accessToken: string;
  verified: boolean;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginVariables {
  input: LoginInput;
}

export interface LoginOutput {
  validateUser: User;
}
