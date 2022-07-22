import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./util";

const authAxios = axios.create();

authAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
