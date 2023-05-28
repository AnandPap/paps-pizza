export function isAuthenticated() {
  if (typeof window == "undefined") return false;
  if (!sessionStorage.getItem("token")) return false;
  return true;
}
