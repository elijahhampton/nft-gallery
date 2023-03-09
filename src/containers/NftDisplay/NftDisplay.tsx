import { OwnedNft } from "alchemy-sdk";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  DialogActions,
  DialogContent,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BrokenImage, Launch } from "@mui/icons-material";
import { SiDiscord, SiEthereum } from "react-icons/si";
import DialogTitle from "../../components/DialogTitle";
import { StyledDialog } from "../../styled/dialog.styled";
import { generateOpenSeaLink } from "../../util";
import { makeStyles } from "@mui/styles";

function NFTInformationModal({
  nft,
  isOpen,
  onClose,
}: {
  nft: OwnedNft;
  isOpen: boolean;
  onClose: any;
}) {
  const {
    spamInfo,
    tokenId,
    balance,
    contract: {
      contractDeployer,
      address: contractAddress,
      openSea,
      symbol,
      name,
      totalSupply,
      tokenType,
    },
  } = nft;

  return (
    <StyledDialog
      PaperProps={{
        style: {
          minWidth: "540px",
          borderRadius: 15,
        },
      }}
      maxWidth="sm"
      onClose={onClose}
      open={isOpen}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <DialogTitle onClose={onClose}>
          {name ?? "Name Unavailable"} {symbol ? `(${symbol})` : ""}
        </DialogTitle>
        <Divider sx={{ width: "100%" }} />
        <Stack pt={2} direction="row" alignItems="center" spacing={2}>
          <Tooltip title={balance} placement="top">
            <Chip
              size="small"
              sx={{ p: 1, fontWeight: "400", maxWidth: 120 }}
              label={`Balance: ${balance}`}
            />
          </Tooltip>

          {totalSupply && (
            <Tooltip title={totalSupply} placement="top">
              <Chip
                size="small"
                sx={{ p: 1, fontWeight: "400", maxWidth: 120 }}
                label={`Total Supply: ${totalSupply}`}
              />
            </Tooltip>
          )}
          <Tooltip title={tokenType} placement="top">
            <Chip
              size="small"
              sx={{ p: 1, fontWeight: "400", maxWidth: 120 }}
              label={`${tokenType}`}
            />
          </Tooltip>

          <Tooltip title={tokenId} placement="top">
            <Chip
              size="small"
              sx={{ p: 1, fontWeight: "400", maxWidth: 120 }}
              label={`Token ID: ${tokenId}`}
            />
          </Tooltip>
        </Stack>
      </Box>

      <DialogContent sx={{ textAlign: "center" }}>
        <Box>
          <Typography fontSize={25} fontWeight="800">
            Description
          </Typography>

          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {spamInfo?.isSpam && spamInfo?.isSpam === true ? (
              <Typography fontSize={13}>🚨 Potential Spam</Typography>
            ) : null}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SiEthereum fontSize={13} />
              <Typography fontSize={13} pl={0.4}>
                {" "}
                Floor Price: {openSea?.floorPrice ?? "Floor Price Unavailable"}
              </Typography>
            </Box>
          </Stack>

          <Typography py={2} paragraph color="text.secondary" variant="body2">
            {openSea?.description ?? "No description available"}
          </Typography>
        </Box>

        <Card
          elevation={0}
          sx={{ p: 2, bgcolor: "rgb(250, 251, 254)", border: "1px solid #eee" }}
        >
          <Stack alignItems="center" spacing={2} direction="row">
            <Typography variant="subtitle2">Contract: </Typography>
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              {contractAddress}{" "}
            </Typography>
          </Stack>
          <Stack alignItems="center" spacing={2} direction="row">
            <Typography variant="subtitle2">Deployed by: </Typography>
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              {contractDeployer}
            </Typography>
          </Stack>
          {openSea?.externalUrl && (
            <Stack alignItems="center" spacing={2} direction="row">
              <Typography variant="subtitle2">External URL: </Typography>
              <Link
                sx={{ fontSize: 13 }}
                onClick={() =>
                  window.open(nft.contract.openSea?.externalUrl, "_blank")
                }
              >
                {openSea?.externalUrl}
              </Link>
            </Stack>
          )}

          {openSea?.discordUrl && (
            <Stack alignItems="center" spacing={2} direction="row">
              <SiDiscord />
              <Typography variant="body2" sx={{ fontSize: 13 }}>
                {openSea?.discordUrl}{" "}
              </Typography>
            </Stack>
          )}
        </Card>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            mx: 2,
            bgcolor: "black",
            textTransform: "none",
          }}
          variant="contained"
          autoFocus
          onClick={() =>
            window.open(generateOpenSeaLink(contractAddress, tokenId), "_blank")
          }
          endIcon={<Launch />}
        >
          Open in OpenSea
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

interface INFTDisplayProps {
  nft: OwnedNft;
}

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
  },
});

export default function NFTDisplay({ nft }: INFTDisplayProps) {
  const classes = useStyles();
  const [infoModalisOpen, setInfoModalIsOpen] = useState<boolean>(false);

  const {
    contract: { name, openSea },
  } = nft;

  return (
    <>
      <Card
        sx={{
          borderRadius: 7,
          textAlign: "center",
          maxHeight: 420,
          height: 400,
          transition: "transform 0.5s ease-out",
          ":hover": {
            transform: "translateY(-8px)",
            top: -8,
            position: "relative",
          },
          m: 2,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        onClick={() => setInfoModalIsOpen(true)}
      >
        <Box
          mb={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {openSea?.imageUrl ? (
            <img
              alt="nft_display_image"
              src={openSea?.imageUrl ?? ""}
              style={{ border: "none", height: "160px", width: "100%" }}
            />
          ) : (
            <Box
              sx={{
                height: "160px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BrokenImage sx={{ fontSize: 80, color: "#aaa" }} />
            </Box>
          )}
        </Box>

        <CardContent>
          <Box sx={{ maxHeight: 320 }}>
            <Typography variant="h5" py={0.8}>
              {name ?? "Name unavailable"}
            </Typography>
            <Chip
              size="small"
              sx={{ minWidth: 120, p: 1, mb: 1, fontWeight: "400" }}
              label={openSea?.collectionName ?? "Unknown collection name"}
            />

            <Typography
              className={classes.multiLineEllipsis}
              variant="body2"
              pt={3}
            >
              {openSea?.description ?? "No description available"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <NFTInformationModal
        nft={nft}
        isOpen={infoModalisOpen}
        onClose={() => setInfoModalIsOpen(false)}
      />
    </>
  );
}
