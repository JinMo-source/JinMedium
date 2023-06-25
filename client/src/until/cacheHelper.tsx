import { InMemoryCache, ApolloClient, useApolloClient } from "@apollo/client";
import { Get_User_Query } from "./userQueries";

export function normalizeAndStoreData(
  client: ApolloClient<any>,
  data: any,
  typeName: string
) {
  console.log(typeName);
  const normalizedUserData = normalizeData(data, typeName);
  client.writeQuery({
    query: Get_User_Query,
    variables: { userId: data.id },
    data: {
      user: {
        normalizedUserData,
      },
    },
  });
}

function normalizeData(data: any[], typeName: string) {
  console.log(typeName);
  const normalizedData: any = {};

  for (const item of data) {
    if (item && item.id) {
      // null 체크 추가
      normalizedData[item.id] = {
        ...item,
        __typename: typeName,
      };
    }
  }
  return normalizedData;
}
