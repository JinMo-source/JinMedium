import { VALIDATEUSER } from "@/graphql/query/Mutation";
import { LoginInput, LoginVariables, AccessToken } from "@/graphql/type/api";
import { useMutation } from "@apollo/client";
import { setCookie } from "nookies";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ValidateUser] = useMutation<AccessToken, LoginVariables>(VALIDATEUSER);

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
      const accessToken = data?.validateUser.accessToken;
      if (accessToken) {
        const maxAgeInSeconds = 30 * 24 * 60 * 60;
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
