import client from "@/apollo-client";
import { gql, useMutation } from "@apollo/client";
import { setCookie } from "nookies";
import { useState } from "react";

const VALIDATEUSER = gql`
  mutation validateUser($input: ValidateUser!) {
    validateUser(input: $input) {
      userEmail
      username
      userId
      accessToken
      verified
      role
    }
  }
`;
interface LoginInput {
  email: string;
  password: string;
}

interface LoginVariables {
  input: LoginInput;
}
enum UserRole {
  admin = "admin",
  writer = "writer",
}
interface User {
  userId: number;
  userEmail: string;
  username: string;
  accessToken: string;
  verified: boolean;
  role: UserRole;
}

interface LoginOutput {
  validateUser: User;
}

const query = gql`
  query GetUser {
    user {
      userId
      username
      userEmail
      verified
      role
    }
  }
`;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ValidateUser] = useMutation<LoginOutput, LoginVariables>(VALIDATEUSER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await ValidateUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const validateUser = data?.validateUser;
      if (validateUser) {
        const { userId, userEmail, username, verified, role } = validateUser;
        const GetUser = {
          user: {
            userId: userId,
            username: username,
            userEmail: userEmail,
            verified: verified,
            role: role,
          },
        };
        client.cache.writeQuery({ query, data: GetUser });
      }

      const { accessToken } = data!.validateUser;

      if (accessToken) {
        const maxAgeInSeconds = 300;
        setCookie(null, "accessToken", accessToken, {
          maxAge: maxAgeInSeconds, // 쿠키의 유효 기간 (예: 30일)
          path: "/", // 쿠키의 유효 경로
          secure: true, // HTTPS에서만 쿠키 전송
          sameSite: "strict", // SameSite 설정
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
