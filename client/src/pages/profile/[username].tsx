import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_USER_QUERY } from "@/until/userQueries";
import ChangeProfile from "@/components/ChangeProfile";

const Profile = () => {
  const [profileTab, setProfileTab] = useState("Account");
  const router = useRouter();
  const { user_domain } = router.query;
  const { data, loading, error } = useQuery(GET_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { username, email } = data.GetUser;

  const handleSelectTab = () => {
    console.log("handleSelectTab");
  };

  const handleChangePassword = () => {
    console.log("hi");
  };

  const handleChangeProfile = () => {
    console.log("profile");
  };
  const handleDeleteAccount = () => {
    console.log("handleDeleteAccount");
  };
  return (
    <>
      <h1>{user_domain}</h1>
      <div>
        <div className="Account">
          <button onClick={handleSelectTab}>Account</button>
        </div>
        <div className="Bookmark">
          <button onClick={handleSelectTab}>Bookmark</button>
        </div>
      </div>
      <div>
        <button onClick={handleChangeProfile}>
          <span>Profile information</span>
          <span>Edit your photo,username,bio</span>
          <span>{username} ✎</span>
        </button>
        <button onClick={handleChangePassword}>
          <span>Password Change</span>
          <span>✎</span>
        </button>
      </div>
      <div>
        <button onClick={handleDeleteAccount}>
          <span>Delete account</span>
        </button>
      </div>
      <ChangeProfile />
    </>
  );
};

export default Profile;
