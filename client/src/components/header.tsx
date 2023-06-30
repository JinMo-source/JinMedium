import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { isLoggedInVar } from "@/until/apollo";
import { useReactiveVar } from "@apollo/client";

const Header = () => {
  const cookies = parseCookies();

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
  };

  return (
    <header>
      <h1>
        <button onClick={handleButtonClick}>Medium Clone Coding</button>
      </h1>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
