const BRANDING = {
  projectName: "NFT Glee",

  superUserName: "NFTGlee",

  urls: {
    base: "bid.nftglee.com",
    www: "bid.nftglee.com",
    protocol: "https://bid.nftglee.com",
    external: {
      twitter: "https://twitter.com/nft_glee",
      telegram: "https://t.me/nft_glee",
      blog: "https://blog.nftglee.com/",
    },
  },

  meta: {
    title: "NFT Glee",
    keywords: "Bitcoin Liquid NFT Art",
    description:
      "Upload, collect, and transact rare digital art on the Liquid Network",
    image: "https://bid.nftglee.com/splash.png",
    url: "https://bid.nftglee.com/",

    twitter: {
      card: "summary_large_image",
      creator: "@nft_glee",
      site: "@nft_glee",
    },

    artwork: (art) => ({
      title: `NFT Glee - ${art.title}`,
      image: `/api/ipfs/${art.filename}`,
      url: `https://bid.nftglee.com/a/${art.slug}`,
    }),
  },

  emails: {
    support: "support@nftglee.com",
  },
};

export default BRANDING;
