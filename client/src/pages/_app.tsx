import type { AppProps } from "next/app";
import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />;
      <Footer />
    </ApolloProvider>
  );
}
