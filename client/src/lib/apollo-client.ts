import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";
import { createCache } from "@/until/cacheHelper";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // 헤더에 토큰을 추가
  const cookies = parseCookies(); // 쿠키 가져오기
  const accessToken = cookies.accessToken;

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const cache = createCache();
const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: cache,
  connectToDevTools: true,
});

export default client;
