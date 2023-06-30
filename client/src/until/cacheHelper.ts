// cacheHelper.ts
import {
  ApolloCache,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";

export const createCache = (): ApolloCache<NormalizedCacheObject> => {
  const cache: any = new InMemoryCache({
    typePolicies: {
      Query: {},
    },
  });

  return cache;
};
