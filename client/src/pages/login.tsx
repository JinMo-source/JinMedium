import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { Get_User_Query } from "@/until/userQueries";
import { LoginOutput, LoginVariables } from "@/userInterface";
import { normalizeAndStoreData } from "@/until/cacheHelper";

const VALIDATEUSER = gql`
  mutation validateUser($input: ValidateUser!) {
    validateUser(input: $input) {
      id
      userEmail
      username
      accessToken
      verified
      role
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ValidateUser] = useMutation<LoginOutput, LoginVariables>(VALIDATEUSER);
  const router = useRouter();
  const client = useApolloClient();

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
        const { id, userEmail, username, verified, role } = validateUser;
        const GetUser = [id, userEmail, username, verified, role];
        normalizeAndStoreData(client, [GetUser], "User");
      }
      const { accessToken } = data!.validateUser;
      if (accessToken) {
        const maxAgeInSeconds = 90000;
        setCookie(null, "accessToken", accessToken, {
          maxAge: maxAgeInSeconds, // 쿠키의 유효 기간 (예: 30일)
          path: "/", // 쿠키의 유효 경로
          secure: true, // HTTPS에서만 쿠키 전송
          sameSite: "strict", // SameSite 설정
        });
      }

      router.push("/");
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
