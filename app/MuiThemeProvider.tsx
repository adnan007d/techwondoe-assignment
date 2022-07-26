import React, { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { selectTheme } from "../features/ui/uiSlice";
import { useSelector } from "react-redux";

const MuiThemeProvider = (props: PropsWithChildren) => {
  const theme = useSelector(selectTheme);

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={`${theme}`}>{props.children}</div>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
