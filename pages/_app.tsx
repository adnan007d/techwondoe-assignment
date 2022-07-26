import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CustomSnackBarProvider from "../app/CustomSnackBarProvider";
import { useEffect } from "react";
import { getUserNameFromToken } from "../util/util";
import { setUser } from "../features/user/userSlice";
import MuiThemeProvider from "../app/MuiThemeProvider";
import { setTheme } from "../features/ui/uiSlice";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const theme = localStorage.getItem("theme") === "dark";
    store.dispatch(setTheme(theme ? "dark" : "light"));
    store.dispatch(setUser(getUserNameFromToken()));
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <CustomSnackBarProvider>
          <Component {...pageProps} />
        </CustomSnackBarProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default MyApp;
