import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // 헤더에 토큰을 추가
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
