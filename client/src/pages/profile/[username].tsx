import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_USER_QUERY } from "@/until/userQueries";

const Profile = () => {
  const router = useRouter();
  const { user_domain } = router.query;
  const { data, loading, error } = useQuery(GET_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { username, email } = data.GetUser;

  const handleChangeEmail = () => {
    console.log("hi");
  };

  const handleChangeProfile = () => {
    console.log("profile");
  };

  return (
    <>
      <h1>{user_domain}</h1>
      <div>
        <div>Account</div>
        <div>Bookmark</div>
      </div>
      <div>
        <button onClick={handleChangeEmail}>
          <span>Email Address</span>
          <span>{email}</span>
        </button>
        <button onClick={handleChangeProfile}>
          <span>Profile information</span>
          <span>Edit your photo,username,bio</span>
          <span>{username}</span>
        </button>
      </div>
    </>
  );
};

export default Profile;
