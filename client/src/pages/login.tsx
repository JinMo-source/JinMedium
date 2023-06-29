import { gql, useMutation } from "@apollo/client";
import { setCookie } from "nookies";
import { useState } from "react";
import { LoginVariablesOutput, LoginVariables } from "@/userInterface";
import { useRouter } from "next/router";
import { isLoggedInVar } from "@/until/apollo";

const VALIDATEUSER = gql`
  mutation validateUser($input: ValidateUser!) {
    validateUser(input: $input) {
      isLoggedIn
      userEmail
      accessToken
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ValidateUser] = useMutation<LoginVariablesOutput, LoginVariables>(
    VALIDATEUSER,
    {}
  );

  const router = useRouter();
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

      const validateUser = data!.validateUser;

      const { userEmail, isLoggedIn, accessToken } = validateUser;

      localStorage.setItem("IsLoggedIn", `${isLoggedIn}`);
      localStorage.setItem("IsLoggedIn_Email", userEmail);

      isLoggedInVar(true);

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
