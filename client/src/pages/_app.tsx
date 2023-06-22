import type { AppProps } from "next/app";
import client from "../apollo-client";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />;
      <Footer />
    </ApolloProvider>
  );
}
