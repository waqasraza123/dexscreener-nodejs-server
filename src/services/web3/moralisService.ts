import axios from 'axios';

class MoralisService {
  private apiKey = process.env.MORALIS_API_KEY;
  private baseUrl = 'https://api.moralis-streams.com/streams/evm';

  public async createStream(streamData: any) {
    console.log(this.apiKey);
    try {
      const response = await axios.put(this.baseUrl, streamData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error creating Moralis stream: ${error.response?.data?.message || error.message}`);
    }
  }
}

export default new MoralisService();
