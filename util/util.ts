import { store } from "../app/store";
import { clearUser, setUser } from "../features/user/userSlice";
import jwt from "jsonwebtoken";
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  SnackbarProps,
} from "notistack";
import { NextRouter } from "next/router";
import { AxiosError } from "axios";

const getToken = () => localStorage.getItem("token");

const getUserNameFromToken = () => {
  const decodedToken = jwt.decode(getToken()!);
  if (typeof decodedToken !== "string") {
    return {
      username: decodedToken?.user,
      _id: decodedToken?.id,
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

interface IHandleError {
  err: any;
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;
  router: NextRouter;
}

const handleError = ({ err, enqueueSnackbar, router }: IHandleError) => {
  if (err instanceof AxiosError) {
    enqueueSnackbar(err.response?.data.message, {
      variant: "error",
    });
    if (checkIfUnauthorized(err)) {
      router.push("/login");
    }
  } else {
    console.error(err);
    enqueueSnackbar("Something went Wrong", {
      variant: "error",
    });
  }
};

function swap<T>(arr: T[], a: number, b: number) {
  const temp: T = arr[a];
  arr[a] = {
    ...arr[a],
    ...arr[b],
  };
  arr[b] = {
    ...arr[b],
    ...temp,
  };
}

export {
  getToken,
  setToken,
  clearToken,
  checkIfUnauthorized,
  getUserNameFromToken,
  swap,
  handleError,
};
