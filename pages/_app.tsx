import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CustomSnackBarProvider from "../app/CustomSnackBarProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CustomSnackBarProvider>
        <Component {...pageProps} />
      </CustomSnackBarProvider>
    </Provider>
  );
}

export default MyApp;
