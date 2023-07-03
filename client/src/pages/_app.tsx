import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "@/lib/apollo-client";
import createWebSocketConnection from "@/until/websocketClient";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }: AppProps) {
  const webSocket = createWebSocketConnection();

  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}
