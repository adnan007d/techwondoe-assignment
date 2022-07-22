import React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";

const SnackbarPosition: SnackbarOrigin = {
  vertical: "top",
  horizontal: "right",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  severity: AlertColor;
  message: string;
}

const CustomSnackBar = ({ open, setOpen, severity, message }: IProps) => {
  const { vertical, horizontal } = SnackbarPosition;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
