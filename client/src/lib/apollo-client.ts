import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies, setCookie } from "nookies";
import { createCache } from "@/until/cacheHelper";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: async () => {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (!token) {
      return true;
    }
    try {
      const decodedToken: any = jwtDecode(token); // 반환 형식을 'any'로 지정
      const exp = new Date(decodedToken.exp * 1000);

      if (Date.now() >= exp.getTime()) {
        // 수정: exp를 밀리초로 변환하여 비교
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }
  },
  fetchAccessToken: async () => {
    const userEmail = localStorage.getItem("IsLoggedIn_Email");
    const response = await fetch("http://localhost:4000/auth/refresh_token", {
      method: "POST",
      credentials: "include",
      headers: {
        // 리프레시 토큰을 헤더에 추가하여 서버로 전송
        Authorization: `${userEmail}`,
      },
    });
    return response;
  },
  handleFetch: (accessToken) => {
    const maxAgeInSeconds = 90000;
    setCookie(null, "accessToken", accessToken, {
      maxAge: maxAgeInSeconds, // 쿠키의 유효 기간 (예: 30일)
      path: "/", // 쿠키의 유효 경로
      secure: true, // HTTPS에서만 쿠키 전송
      sameSite: "strict", // SameSite 설정
    });
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

// 토큰을 헤더에 추가하는 역할을 수행하는 링크
const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies();
  const accessToken = cookies.accessToken;

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});
const link = ApolloLink.from([tokenRefreshLink, authLink, httpLink]);

const cache = createCache();
const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: link,
  cache: cache,
  connectToDevTools: true,
});

export default client;
