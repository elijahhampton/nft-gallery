
import clsx from "clsx";

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  Theme,
  AlertColor,
  SnackbarOrigin,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const autoHideDuration = 4000;
const anchorOrigin: SnackbarOrigin = {
  horizontal: "center",
  vertical: "top",
};
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: "#2e7d32",
  },
  error: {
    backgroundColor: "#d32f2f",
  },
  info: {
    backgroundColor: "#0288d1",
  },
  warning: {
    backgroundColor: "#ed6c02",
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 5,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

interface ISnackBarProps {
  message: string;
  variant: AlertColor;
  onClose?: () => void;
  open: boolean;
  className: any;
}
function SnackBar({
  message = "",
  variant = "info",
  onClose = () => {
    // default function
  },
  open,
  className,
  ...other
}: ISnackBarProps) {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <SnackbarContent
        className={clsx(classes[variant], className)}
        message={
          <span className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
};

export default SnackBar;
