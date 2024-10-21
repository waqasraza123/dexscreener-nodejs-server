import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export interface TokenInfo {
    mintAddress: string;
    decimals: number;
    totalSupply: string;
    mintAuthority: string | null;
    freezeAuthority: string | null;
}

export const getTokenInfo = async (mintAddress: string): Promise<TokenInfo> => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const token = new Token(connection, mintAddress, TOKEN_PROGRAM_ID, null);

    const supply = await token.getMintInfo();

    return {
        mintAddress,
        decimals: supply.decimals,
        totalSupply: supply.supply.toString(),
        mintAuthority: supply.mintAuthority ? supply.mintAuthority.toString() : null,
        freezeAuthority: supply.freezeAuthority ? supply.freezeAuthority.toString() : null,
    };
};
