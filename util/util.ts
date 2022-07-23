import { store } from "../app/store";
import { clearUser, setUser } from "../features/user/userSlice";
import jwt from "jsonwebtoken";

const getToken = () => localStorage.getItem("token");

const getUserNameFromToken = () => {
  const decodedToken = jwt.decode(getToken()!);
  if (typeof decodedToken !== "string") {
    return {
      username: decodedToken?.user,
      id: decodedToken?.id,
    };
  }
  return null;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
  store.dispatch(setUser(getUserNameFromToken()));
};

const clearToken = () => {
  store.dispatch(clearUser());
  localStorage.removeItem("token");
};

const checkIfUnauthorized = (err: any) => {
  if (
    err?.response?.status === 401 &&
    err?.response?.data?.message.toLowerCase() === "unauthorized"
  ) {
    clearToken();
    return true;
  }
  return false;
};

export {
  getToken,
  setToken,
  clearToken,
  checkIfUnauthorized,
  getUserNameFromToken,
};
