import { useEffect, useState } from "react";
import "./App.css";
import { OwnedNft } from "alchemy-sdk";
import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { listNftsByAddress } from "./api";
import { NFTDisplaySkeleton } from "./containers/NftDisplay";
import NFTDisplay from "./containers/NftDisplay/NftDisplay";
import NavigationBar from "./components/NavigationBar";
import AlertSnack, { alertSnack } from "./components/AlertSnack/AlertSnack";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [owner, setOwner] = useState<string>("");
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [isFilteringSpam, setIsFilteringSpam] = useState<boolean>(false);
  const [filteredNfts, setFilteredNfts] = useState<OwnedNft[]>([]);

  const onSearch = (key: string, value: string) => {
    if (key === "Enter") {
      onListNfts(value);
    }
  };

  const onListNfts = (address: string) => {
    setLoading(true);
    listNftsByAddress(address)
      .then((data: Array<OwnedNft>) => {
        setOwner(address);
        setNfts(data);
        setFilteredNfts(data);
      })
      .catch((error: Error) => {
        alertSnack({
          message: `${error?.message}`,
          duration: 3000,
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFilteringSpam) {
      setFilteredNfts(
        nfts.filter((nft: OwnedNft) => {
          return nft.spamInfo?.isSpam !== true;
        })
      );
    } else {
      setFilteredNfts(nfts);
    }
    // eslint-disable-next-line
  }, [isFilteringSpam]);

  const onRefresh = () => onListNfts(owner);

  return (
    <div className="App">
      <NavigationBar onSearch={onSearch} isLoading={loading} />
      <Container
        maxWidth="lg"
        sx={{ pt: 10, height: "100vh", overflow: "scroll" }}
      >
        {!owner ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h3" textAlign="center" color="text.secondary">
              Try searching for an Ethereum address...
            </Typography>
          </Box>
        ) : (
          <>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box sx={{}}>
                <Typography variant="h6" fontSize={26}>
                  View user collections
                </Typography>
                <Typography color="text.secondary">
                  {owner} has a total of {nfts.length} nfts
                </Typography>
              </Box>

              <Stack spacing={1} direction="row" alignItems="center">
                <FormControlLabel
                  value="Top"
                  control={
                    <Switch
                      onChange={() =>
                        setIsFilteringSpam((prev: boolean) => !prev)
                      }
                      defaultChecked
                      checked={isFilteringSpam}
                    />
                  }
                  label={
                    !isFilteringSpam
                      ? "Remove Potential Spam"
                      : "Spam Removed!"
                  }
                />
                <IconButton
                  onClick={onRefresh}
                  sx={{ bgcolor: "#eaeaea", border: "1px solid #ddd" }}
                  size="small"
                >
                  <Refresh fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Grid container direction="row" alignItems="center">
              {loading &&
                [0, 1, 2, 3, 4, 5, 6, 7].map((val) => {
                  return (
                    <Grid item xs={12} md={6} lg={3}>
                      <NFTDisplaySkeleton />
                    </Grid>
                  );
                })}
              {!loading &&
                filteredNfts.map((nft) => {
                  return (
                    <Grid item xs={12} md={6} lg={3}>
                      <NFTDisplay nft={nft} />
                    </Grid>
                  );
                })}
            </Grid>
          </>
        )}
      </Container>
      <AlertSnack />
    </div>
  );
}

export default App;
