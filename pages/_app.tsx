import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CustomSnackBarProvider from "../app/CustomSnackBarProvider";
import { useEffect } from "react";
import { getUserNameFromToken } from "../util/util";
import { setUser } from "../features/user/userSlice";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(setUser(getUserNameFromToken()));
  }, []);

  return (
    <Provider store={store}>
      <CustomSnackBarProvider>
        <Component {...pageProps} />
      </CustomSnackBarProvider>
    </Provider>
  );
}

export default MyApp;
