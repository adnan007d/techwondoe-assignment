import { AxiosError } from "axios";
import { NextRouter } from "next/router";

const getToken = () => localStorage.getItem("token");

const setToken = (token: string) => localStorage.setItem("token", token);

const clearToken = () => localStorage.removeItem("token");

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

export { getToken, setToken, clearToken, checkIfUnauthorized };
