import Cookies from "universal-cookie";
const cookies = new Cookies();
export function setTokenCookie(token: string) {
  cookies.set("token", token, {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
}

export function setCookie(key: string, value: string) {
  cookies.set(key, value, {
    path: "/",
  });
}

export function getCookie(key: string) {
  return cookies.get(key);
}

export function removeCookie(key: string) {
  return cookies.remove(key);
}
