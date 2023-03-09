import { AppBar, Toolbar, Container, Typography, Box, LinearProgress } from "@mui/material";
import SearchBar from "../SearchBar";

interface INavigationBarProps {
    onSearch: (key: string, value: string) => void;
    isLoading: boolean;
}

function NavigationBar({ onSearch, isLoading }: INavigationBarProps) {
  return (
    <AppBar sx={{ bgcolor: "white", borderBottom: "1px solid #ddd" }}>
      <Toolbar disableGutters>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight="bold" fontSize={26} sx={{ color: "black" }}>
            NFT Gallery
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 500, mx: 2 }}>
              <SearchBar onSearch={onSearch} />
            </Box>
          </Box>
        </Container>
      </Toolbar>
      {isLoading && <LinearProgress variant='indeterminate' />}
    </AppBar>
  );
}

export default NavigationBar;
