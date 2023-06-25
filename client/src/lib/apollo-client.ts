import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

function initializeApollo() {
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

  const cache = new InMemoryCache({
    typePolicies: {
      user: {
        keyFields: ["id"],
        fields: {
          id: {
            read(id) {
              return `User:${id}`;
            },
          },
          userEmail: {
            read(userEmail) {
              return userEmail;
            },
          },
          username: {
            read(username) {
              return username;
            },
          },
          verified: {
            read(verified) {
              return verified;
            },
          },
          role: {
            read(role) {
              return role;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: cache,
    connectToDevTools: true,
  });

  if (typeof window !== "undefined") {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return client;
}

export default initializeApollo;
