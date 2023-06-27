import { useEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql } from "@apollo/client";

interface AccessTokenUserInterface {
  userId: number;
}

const GET_USER = gql`
  query GetUser($ID: GetUserInput!) {
    GetUser(ID: $input) {
      newAccessToken
      expiresInMs
    }
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      setIsLoggedIn(true);
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleLogout = () => {
    // 필요한 로그아웃 작업 수행

    // 1. 쿠키 삭제
    destroyCookie(null, "accessToken");

    // 2. 로컬 스토리지의 isLoggedIn 상태 변경
    localStorage.removeItem("isLoggedIn");

    // 3. 필요한 추가 작업 수행 (예: 서버 요청 등)

    // 로그아웃 후 리디렉션 또는 다른 작업 수행
    router.push("/");
    window.location.reload();
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
                    <Link href="/user/profile">Profile</Link>
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
