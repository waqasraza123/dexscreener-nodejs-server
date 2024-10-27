import { Request, Response } from 'express';
import MoralisService from '../../services/web3/moralisService';

export const createStream = async (req: Request, res: Response) => {
  const { webhookUrl, description, tag, topic0, chainIds, allAddresses, includeNativeTxs, includeContractLogs } = req.body;

  const streamData = {
    webhookUrl,
    description,
    tag,
    topic0,
    chainIds,
    allAddresses: allAddresses || false,
    includeNativeTxs: includeNativeTxs || false,
    includeContractLogs: includeContractLogs || false,
    // Additional options can be added here as needed
  };

  try {
    const result = await MoralisService.createStream(streamData);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
