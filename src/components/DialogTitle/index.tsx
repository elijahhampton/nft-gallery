import { Close } from "@mui/icons-material";
import { DialogTitle as MuiDialogTitle, IconButton } from "@mui/material";

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function DialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle sx={{ fontSize: 26, m: 0, p: 0.8 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          size="small"
          aria-label="close"
          onClick={onClose}
          sx={{
            bgcolor: "transparent",
            position: "absolute",
            right: 5,
            top: 5,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default DialogTitle;
