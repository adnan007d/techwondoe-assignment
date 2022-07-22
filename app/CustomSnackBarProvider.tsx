import { SnackbarProvider, useSnackbar } from "notistack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { PropsWithChildren } from "react";

import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

function SnackbarCloseButton({ id }: { id: number | string }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(id)} color={"inherit"}>
      <Close />
    </IconButton>
  );
}

const CustomSnackBarProvider = (props: PropsWithChildren) => (
  <SnackbarProvider
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    iconVariant={{
      error: <ErrorOutlineIcon />,
      info: <InfoIcon />,
      success: <CheckCircleOutlineIcon />,
      warning: <WarningAmberIcon />,
    }}
    action={(key) => <SnackbarCloseButton id={key} />}
  >
    {props.children}
  </SnackbarProvider>
);

export default CustomSnackBarProvider;
