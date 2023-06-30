import { LoginOutput } from "@/userInterface";
import { makeVar } from "@apollo/client";
import { destroyCookie, setCookie } from "nookies";

export const isLoggedInVar = makeVar(false);

export function loginState({
  userEmail,
  username,
  isLoggedIn,
  accessToken,
}: LoginOutput) {
  const maxAgeInSeconds = 90000;
  setCookie(null, "accessToken", accessToken, {
    maxAge: maxAgeInSeconds, // 쿠키의 유효 기간 (예: 30일)
    path: "/", // 쿠키의 유효 경로
    secure: true, // HTTPS에서만 쿠키 전송
    sameSite: "strict", // SameSite 설정
  });

  localStorage.setItem("IsLoggedIn", `${isLoggedIn}`);
  localStorage.setItem("IsLoggedIn_Email", userEmail);
  localStorage.setItem("IsLoggedIn_Username", username);
  isLoggedInVar(true);
}

export function logoutState() {
  destroyCookie(null, "accessToken");

  localStorage.removeItem("IsLoggedIn");
  localStorage.removeItem("IsLoggedIn_Email");
  localStorage.removeItem("IsLoggedIn_Username");

  isLoggedInVar(false);
}
