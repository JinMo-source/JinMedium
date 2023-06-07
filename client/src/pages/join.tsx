import { SiGNUP } from "@/graphql/query/Mutation";
import { UserInput, UserVariables } from "@/graphql/type/api";
import { useMutation } from "@apollo/client";

import { useState } from "react";

export default function Join() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [signup] = useMutation<UserInput, UserVariables>(SiGNUP);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          input: {
            username,
            password,
            email,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
}
