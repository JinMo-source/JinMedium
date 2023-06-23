import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { gql, useMutation } from "@apollo/client";

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

const Header = () => {
  const [refreshAccessToken] = useMutation<
    RefreshTokenOutput,
    RefreshTokenInput
  >(REFRESH_ACCESS_TOKEN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = parseCookies();
  const [accessToken, setAccessToken] = useState(cookies.accessToken);
  const [expiresAt, setExpiresAt] = useState(() => {
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // 15분 뒤의 시간
    return expirationTime;
  });
  const [test, setTest] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(storedLoggedInStatus === "true");
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { isLoggedIn } = event.data;
      setIsLoggedIn(isLoggedIn);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
    if (expiresAt && isLoggedIn) {
      console.log("TimerStart");

      const refreshTokenExpirationMs =
        calculateTokenExpirationTime(expiresAt) - 60000;
      const timeoutId = setTimeout(
        handleRefreshAccessToken,
        refreshTokenExpirationMs
      );
      return () => clearTimeout(timeoutId);
    }
  }, [expiresAt, isLoggedIn]);

  return (
    <header>
      <h1>Medium Clone Coding</h1>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
