import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getPrediction = async (tokens: any[]) => {
  const prompt = generatePrompt(tokens);

  try {
    const response = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt,
        max_tokens: 150,
    });

    const predictions = response.choices[0].text.trim();
    return predictions;
  } catch (error: any) {
    throw new Error(`Error getting prediction: ${error.message}`);
  }
};

// Helper function to generate a suitable prompt for OpenAI
const generatePrompt = (tokens: any[]) => {
  let prompt = `Given the following token data, provide predictions about their future performance based on trends in market volume, transactions, market cap, and percentage increases over time:\n`;

  tokens.forEach((token, index) => {
    prompt += `Token ${index + 1}:\n`;
    prompt += `Volume: ${token.volume}\n`;
    prompt += `Transactions: ${token.transactions}\n`;
    prompt += `Market Cap: ${token.marketCap}\n`;
    prompt += `Percentage Increase (24h): ${token.percentageIncrease24h}%\n`;
    prompt += `Percentage Increase (1h): ${token.percentageIncrease1h}%\n\n`;
  });

  prompt += `Based on this data, what are the trends and likely future behavior of these tokens?\n`;
  return prompt;
};
