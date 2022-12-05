export function authenticate(token, callback) {
  if (typeof window !== "undefined")
    sessionStorage.setItem("token", JSON.stringify(token));
  callback();
}

export function isAuthenticated() {
  if (typeof window == "undefined") return false;
  if (!sessionStorage.getItem("token")) return false;
  return true;
}

export function clearJWT() {
  if (typeof window !== "undefined") sessionStorage.removeItem("token");
}
