import { useEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logoutState } from "@/until/apollo";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const MakeVarLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    const LoggedInState = Boolean(localStorage.getItem("IsLoggedIn"));
    const LoggedInUsername = localStorage.getItem("IsLoggedIn_Username");

    if (LoggedInState && LoggedInUsername) {
      setIsLoggedIn(LoggedInState);
      setUsername(LoggedInUsername);
    }
  }, [MakeVarLoggedIn]);

  const handleLogout = () => {
    logoutState();
    router.push("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <>
            <li>
              <Link href="/join">회원가입</Link>
            </li>
            <li>
              <Link href="/login">로그인</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link href="/board/upload">Upload</Link>
            </li>
            <li>
              <Link href="/notifications">알람</Link>
            </li>
            <li>
              <button onClick={toggleMenu}>User</button>
              {isMenuOpen && (
                <ul>
                  <li>
                    <Link
                      href="/profile/@username"
                      as={`/profile/@${username}`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/library">Library</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
