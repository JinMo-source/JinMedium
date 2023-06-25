import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import initializeApollo from "./apollo-client";

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  const client = useMemo(() => initializeApollo(), []);
  return client;
}
