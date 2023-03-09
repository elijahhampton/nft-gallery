import { InputBase, styled } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  borderRadius: theme.shape.borderRadius * 1.8,
  border: "1px solid rgba(204, 204, 204, 0.4)",
  marginLeft: 0,
  alignItems: "flex-start",
  width: "100%",

  display: "flex",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  color: "rgba(174, 171, 171, 1)",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100% !important",
  "& .MuiInputBase-input": {
    alignSelf: "flex-start",
    "&focus": {
      color: "black",
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(${theme.spacing(2)})`,
    color: "black",
    transition: theme.transitions.create("width"),
    width: "100% !important",
    height: "35px",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
