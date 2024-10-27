import Moralis from 'moralis';

class MoralisService {
  constructor() {
    // Initialize Moralis SDK with API Key
    Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  // Method to create a new EVM stream using Moralis SDK
  public async createStream(streamData: any) {
    try {
      const response = await Moralis.Streams.add(streamData);
      return response.result; // Assuming result contains the data
    } catch (error: any) {
      throw new Error(`Error creating Moralis stream: ${error.message}`);
    }
  }

  // Function to fetch multiple NFTs using Moralis SDK
  public async getMultipleNFTs() {
    try {
      const response = await Moralis.EvmApi.nft.getMultipleNFTs({
        tokens: [
          {
            tokenAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // Bored Ape Yacht Club
            tokenId: "1",
          },
          {
            tokenAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", // CryptoPunks
            tokenId: "100",
          },
          {
            tokenAddress: "0x3ed3b3f4f474c5e6c95d7e3bfa5cbf8e0aa33e4e", // Mutant Ape Yacht Club
            tokenId: "1",
          },
          {
            tokenAddress: "0x9c3c9283d3e44854697cd22d3f5e6b53795c1f9", // World of Women
            tokenId: "1",
          },
          {
            tokenAddress: "0x7b06dc92b4384a7e60d1c120c36f1d529eb6f23d", // Doodles
            tokenId: "1",
          },
          {
            tokenAddress: "0x5a8c68d7c9d30c1f443d237d79c6de77f1ff25aa", // Clone X
            tokenId: "1",
          },
          {
            tokenAddress: "0x82c4d8dcdab9d2dce5e51b7e4212c3ef14d0d5f2", // Pudgy Penguins
            tokenId: "1",
          },
          {
            tokenAddress: "0xe1f80a7ef2ab6c6a27d1ffda3c9c3e5da7b6b95e", // Cool Cats
            tokenId: "1",
          },
          {
            tokenAddress: "0x9c5d8fabb5a2f2d2021d59eeebf7b705279b39f2", // Art Blocks
            tokenId: "1",
          },
          {
            tokenAddress: "0x0493b86c270f9447d6ab0e9db5e6c4e0d303c798", // Rumble Kong League
            tokenId: "1",
          },
          {
            tokenAddress: "0x44fa1ed4ef4a1c15df8ee05b6b1bdf627aef4c3e", // Meebits
            tokenId: "1",
          },
          {
            tokenAddress: "0x93a9f703ce92750551f0b80b3cba6b34f4a16b0a", // Invisible Friends
            tokenId: "1",
          },
          {
            tokenAddress: "0x4c31aa5a5cf9a5e81f5b2793dbb8b36b1ac58cb1", // Sappy Seals
            tokenId: "1",
          },
          {
            tokenAddress: "0xf69549c0d40a07c650e6c63fbbd4eae8e9c8db39", // The Sandbox
            tokenId: "1",
          },
          {
            tokenAddress: "0x4f4f2dc00462da5c3e179e3b2b007b66a0ed519d", // Axie Infinity
            tokenId: "1",
          },
          {
            tokenAddress: "0x1f7e1254337a7438260a94bdb7b334ea0344e98c", // Decentraland
            tokenId: "1",
          },
          {
            tokenAddress: "0xe92c8e60a3e8ec7e02c3c66e36c59774c7f3b1b6", // Chain Runners
            tokenId: "1",
          },
          {
            tokenAddress: "0x5f19b6c6c93c0fcfa90d7a01b0e1e3b1780863c7", // KryptoKitties
            tokenId: "1",
          },
          {
            tokenAddress: "0xdcb6f15b0e6cbb5e71a31a104ec8e003c3784567", // Hashmasks
            tokenId: "1",
          },
          {
            tokenAddress: "0x6769e3cd2410e11b5da0374b4d836f3c69d4bcd5", // Zed Run
            tokenId: "1",
          },
          {
            tokenAddress: "0xc6ec65fbb90f3b98a56cc1a77a2f3ef5d95a6a1b", // World of Women Galaxy
            tokenId: "1",
          }
        ],
        chain: "0x1", // Ethereum Mainnet
      });
      return response.result; // Adjust based on the SDK's return structure
    } catch (error: any) {
      throw new Error(`Error fetching NFTs: ${error.message}`);
    }
  }
}

export default new MoralisService();
