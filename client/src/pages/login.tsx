import { VALIDATEUSER } from "@/graphql/query/Mutation";
import { LoginInput, LoginVariables, AccessToken } from "@/graphql/type/api";
import { useMutation } from "@apollo/client";

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
      // const token = data?.validateUser?.accessToken || ""; // 토큰 추출
      // localStorage.setItem("accessToken", token);
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
