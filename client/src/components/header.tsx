import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { isLoggedInVar } from "@/until/apollo";
import { useReactiveVar } from "@apollo/client";

export interface RefreshToken {
  accessToken: string;
}
export interface RefreshTokenInput {
  input: RefreshToken;
}
export interface RefreshTokenOutput {
  newAccessToken: string;
  expiresInMs: Date;
}

const REFRESH_ACCESS_TOKEN = gql`
  mutation RefreshAccessTokenResolver($input: RefreshTokenInput!) {
    RefreshAccessTokenResolver(input: $input) {
      newAccessToken
      expiresInMs
    }
  }
`;

export interface GetUserInput {
  id: number;
}

const GET_USER = gql`
  query GetUser($ID: GetUserInput!) {
    GetUser(ID: $input) {
      newAccessToken
      expiresInMs
    }
  }
`;

const Header = () => {
  const [refreshAccessToken] = useMutation<
    RefreshTokenOutput,
    RefreshTokenInput
  >(REFRESH_ACCESS_TOKEN);
  const cookies = parseCookies();
  const [isLoggedInState, setIsLoggedState] = useState(false);
  const [accessToken, setAccessToken] = useState(cookies.accessToken);
  const [expiresAt, setExpiresAt] = useState(() => {
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // 15분 뒤의 시간
    return expirationTime;
  });
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();

  const handleRefreshAccessToken = async () => {
    try {
      const { data } = await refreshAccessToken({
        variables: { input: { accessToken } },
      });
      const newAccessToken = data!.newAccessToken;
      const newExpiresAt = new Date(data!.expiresInMs);
      console.log(newAccessToken);
      setAccessToken(newAccessToken);
      setExpiresAt(newExpiresAt);

      setCookie(null, "accessToken", newAccessToken, {
        maxAge: 90000,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTokenExpirationTime = (expiresAt: Date): number => {
    const currentTime = new Date();
    const expiresInMs = expiresAt.getTime() - currentTime.getTime();
    return expiresInMs;
  };

  useEffect(() => {
    if ((expiresAt && isLoggedIn) || isLoggedInState) {
      console.log("TimerStart");

      const refreshTokenExpirationMs =
        calculateTokenExpirationTime(expiresAt) - 60000;
      const timeoutId = setTimeout(
        handleRefreshAccessToken,
        refreshTokenExpirationMs
      );
      return () => clearTimeout(timeoutId);
    }
  }, [expiresAt, isLoggedIn, isLoggedInState]);

  const handleButtonClick = () => {
    router.push("/");
  };

  return (
    <header>
      <h1>
        <button onClick={handleButtonClick}>Medium Clone Coding</button>
      </h1>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
