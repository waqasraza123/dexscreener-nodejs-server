import { getMint } from '@solana/spl-token';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import web3 from '@solana/web3.js';

// Function to get mint information (e.g., token supply)
export const getTokenInfo = async (mintAddress: string) => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const address = new web3.PublicKey(mintAddress);
    const mintInfo = await getMint(connection, address);

    console.log("Token Supply: ", mintInfo.supply.toString());
    console.log("Decimals: ", mintInfo.decimals);
    console.log("Mint Authority: ", mintInfo.mintAuthority?.toString());
    console.log("Freeze Authority: ", mintInfo.freezeAuthority?.toString());
};

// Function to get token account balance
export const getTokenAccountInfo = async (tokenAccountAddress: string) => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const tokenAccountPublicKey = new PublicKey(tokenAccountAddress);
    const tokenAccountInfo = await connection.getTokenAccountBalance(tokenAccountPublicKey);

    console.log("Token Account Balance: ", tokenAccountInfo.value.amount);
};
