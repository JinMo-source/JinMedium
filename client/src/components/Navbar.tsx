import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Link from "next/link";

interface AccessTokenUserInterface {
  userId: number;
}
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
              <Link href="/upload">Upload</Link>
            </li>
            <li>
              <Link href="/notifications">알람</Link>
            </li>
            <li>
              <Link href="/user">User</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
