import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import client from "@/lib/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}
