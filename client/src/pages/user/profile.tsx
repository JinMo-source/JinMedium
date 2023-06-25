import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export interface RefreshToken {
  id: number;
}
export interface RefreshTokenInput {
  input: RefreshToken;
}
export interface RefreshTokenOutput {
  newAccessToken: string;
  expiresInMs: Date;
}

const GET_USER = gql`
  mutation GetUser($ID: GetUserInput!) {
    GetUser(ID: $input) {
      newAccessToken
      expiresInMs
    }
  }
`;

const Profile = () => {
  //   const [refreshAccessToken] = useMutation<
  //     RefreshTokenOutput,
  //     RefreshTokenInput
  //   >(REFRESH_ACCESS_TOKEN);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
