import { LOGIN } from "@/graphql/query/Mutation";
import { LoginInput, LoginVariables } from "@/graphql/type/api";
import { useMutation } from "@apollo/client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Login] = useMutation<LoginInput, LoginVariables>(LOGIN);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await Login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
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
