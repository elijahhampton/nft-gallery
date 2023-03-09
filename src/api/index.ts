import { Network, Alchemy, OwnedNftsResponse, OwnedNft } from "alchemy-sdk";
import { ALCHEMY_API_KEY } from "../constant/environment";

const settings = {
    apiKey: ALCHEMY_API_KEY, //alchemy api key from .env
    network: Network.ETH_MAINNET, //default to ethereum mainnet
  };
  console.log(ALCHEMY_API_KEY)
const alchemy: Alchemy = new Alchemy(settings);

async function listNftsByAddress(address: string): Promise<Array<OwnedNft>> {

   return alchemy.nft.getNftsForOwner(address)
   .then((value: OwnedNftsResponse) => {
    return value.ownedNfts
   })
   .catch(error => {
    throw new Error(error)
   })
}

export { listNftsByAddress }