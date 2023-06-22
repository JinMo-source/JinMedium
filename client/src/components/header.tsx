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

  const cookies = parseCookies();
  const [accessToken, setAccessToken] = useState(cookies.accessToken);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

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
      // 에러를 적절히 처리하세요
    }
  };

  const calculateTokenExpirationTime = (expiresAt: Date): number => {
    const currentTime = new Date();
    const expiresInMs = expiresAt.getTime() - currentTime.getTime();
    return expiresInMs;
  };

  useEffect(() => {
    if (expiresAt) {
      console.log("TimerStert");
      const refreshTokenExpirationMs =
        calculateTokenExpirationTime(expiresAt) - 60000; // 토큰 만료 1분 전에 재요청
      const timeoutId = setTimeout(
        handleRefreshAccessToken,
        refreshTokenExpirationMs
      );

      return () => clearTimeout(timeoutId);
    }
  }, [expiresAt]);

  useEffect(() => {
    if (cookies.accessToken) {
      console.log("start");
      handleRefreshAccessToken();
    }
  }, []);

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
