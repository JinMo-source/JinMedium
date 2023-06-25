import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useApollo } from "@/lib/useApollo";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}
