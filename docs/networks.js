// https://stealthaddress.dev/contracts/deployments
const NETWORKS = {
  1: {
    name: "Ethereum Mainnet",
    explorer: "https://etherscan.io/",
    nonFungibleViewer: "https://opensea.io/assets/ethereum/${contract}/${tokenId}",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${contract}/logo.png",
    ],
    reservoir: "https://api.reservoir.tools/",
    contracts: {
      "0x2823589Ae095D99bD64dEeA80B4690313e2fB519": { type: "erc20", name: "WEENUS" },
      "0xeEf5E2d8255E973d587217f9509B416b41CA5870": { type: "erc20", name: "XEENUS" },
      "0x187E63F9eBA692A0ac98d3edE6fEb870AF0079e1": { type: "erc20", name: "YEENUS" },
      "0x0693c3a780A0a757E803a4BD76bCf43d438f8806": { type: "erc20", name: "ZEENUS" },
      "0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB": { type: "erc721", name: "CryptoDickButts S3" },
      "0x8FA600364B93C53e0c71C7A33d2adE21f4351da3": { type: "erc721", name: "Larva Chads" },
      "0x282BDD42f4eb70e7A9D9F40c8fEA0825B7f68C5D": { type: "erc721", name: "CryptoPunks V1" },
      "0xB32979486938AA9694BFC898f35DBED459F44424": { type: "erc1155", name: "Nyan Cat" },
      "0xFe9231f0e6753a8412a00eC1f0028A24d5220Ba9": { type: "erc1155", name: "Zombie Babies" },
    },
  },
  42161: {
    name: "Arbitrum",
    explorer: "https://arbiscan.io/",
    nonFungibleViewer: "https://opensea.io/assets/arbitrum/${contract}/${tokenId}",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/arbitrum/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/${contract}/logo.png",
    ],
    reservoir: "https://api-arbitrum.reservoir.tools/",
  },
  8453: {
    name: "Base",
    explorer: "https://basescan.org/",
    nonFungibleViewer: "https://opensea.io/assets/base/${contract}/${tokenId}",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/base/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/assets/${contract}/logo.png",
    ],
    reservoir: "https://api-base.reservoir.tools/",
    maxLogScrapingSize: 10_000, // TODO: Base RPC server fails for > 10k blocks for ERC-20 event log scraping
  },
  100: {
    name: "Gnosis Chain",
    explorer: "https://gnosisscan.io/",
  },
  10: {
    name: "Optimism",
    explorer: "https://optimistic.etherscan.io/",
    nonFungibleViewer: "https://opensea.io/assets/optimism/${contract}/${tokenId}",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/optimism/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/${contract}/logo.png",
    ],
    reservoir: "https://api-optimism.reservoir.tools/",
  },
  137: {
    name: "Polygon Matic",
    explorer: "https://polygonscan.com/",
    nonFungibleViewer: "https://opensea.io/assets/matic/${contract}/${tokenId}",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/${contract}/logo.png",
    ],
    reservoir: "https://api-polygon.reservoir.tools/",
  },
  534352: {
    name: "Scroll",
    explorer: "https://scrollscan.com/",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/scroll/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/scroll/assets/${contract}/logo.png",
    ],
    reservoir: "https://api-scroll.reservoir.tools/",
  },
  11155111: {
    name: "Sepolia Testnet",
    // transferHelper: {
    //   // TODO: ABI & versions
    //   name: "MagicalInternetMoney-0.8.3",
    //   address: "0xAd4EFaB0A1c32184c6254e07eb6D26A3AaEB0Ae2",
    // },
    explorer: "https://sepolia.etherscan.io/",
    nonFungibleViewer: "https://testnets.opensea.io/assets/sepolia/${contract}/${tokenId}",
    erc20Logos: [
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/sepolia/assets/${contract}/logo.png",
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/sepolia/assets/${contract}/logo.png",
    ],
    reservoir: "https://api-sepolia.reservoir.tools/",
    contracts: {
      "0x7439E9Bb6D8a84dd3A23fe621A30F95403F87fB9": { type: "erc20", name: "WEENUS" },
      "0xc21d97673B9E0B3AA53a06439F71fDc1facE393B": { type: "erc20", name: "XEENUS" },
      "0x93fCA4c6E2525C09c95269055B46f16b1459BF9d": { type: "erc20", name: "YEENUS" },
      "0xe9EF74A6568E9f0e42a587C9363C9BcC582dcC6c": { type: "erc20", name: "ZEENUS" },
      "0x1e5df6db242d07cc40a37b634022c02f73a74d59": { type: "erc20", name: "MYERC20TOKEN" },
      "0x8b73448426797099b6b9a96c4343f528bbAfc55e": { type: "erc721", name: "TESTTOADZ" },
      "0x3F15A716888EFb6871872fC4358F638DEE495f3b": { type: "erc1155", name: "RANDOM" },
    },
  },
  17000: {
    name: "Holešky Testnet",
    explorer: "https://holesky.etherscan.io/",
  },
  421614: {
    name: "Arbitrum Sepolia Testnet",
    explorer: "https://sepolia.arbiscan.io/",
    nonFungibleViewer: "https://testnets.opensea.io/assets/arbitrum-sepolia/${contract}/${tokenId}",
  },
  84532: {
    name: "Base Sepolia Testnet",
    explorer: "https://sepolia.basescan.org/",
    nonFungibleViewer: "https://testnets.opensea.io/assets/base-sepolia/${contract}/${tokenId}",
    reservoir: "https://api-base-sepolia.reservoir.tools/",
  },
  11155420: {
    name: "Optimism Sepolia Testnet",
    explorer: "https://sepolia-optimism.etherscan.io/",
  },
};
