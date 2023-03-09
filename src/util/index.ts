const generateOpenSeaLink = (contractAddress: string, tokenId: string): string => {
    return `https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`
}

const generateUserOpenSeaLink = (address: string): string => {
    return `https://opensea.io/${address}`
}

export { generateOpenSeaLink, generateUserOpenSeaLink }