import * as cheerio from 'cheerio';
import fs from 'fs';
import supabase from '../config/supabaseClient';

// Define the keys for each item
const keys = [
  'token',
  'price',
  'age',
  'txns',
  'volume',
  'makers',
  '5m',
  '1h',
  '6h',
  '24h',
  'liquidity',
  'mcap'
] as const;

// Define the type for row data
interface TokenData {
  number?: string;
  chainLogoUrl?: string;
  dexLogoUrl?: string;
  tokenSymbol?: string;
  chainSymbol?: string;
  tokenImageUrl?: string;
  tokenName?: string;
}

interface RowData {
  [key: string]: string | TokenData | undefined;
}

// Function to parse the table HTML and store data in Supabase
async function parseHtmlToSupabase(htmlFilePath: string): Promise<void> {
  // Read the HTML file
  const html = fs.readFileSync(htmlFilePath, 'utf-8');

  // Load HTML into cheerio
  const $ = cheerio.load(html);

  const rows: RowData[] = [];

  // Iterate over each row with class 'ds-dex-table-row'
  $('.ds-dex-table-row').each((index, row) => {
    const rowData: RowData = {};

    // Extract Contract_Address from href attribute in anchor tag
    const contractAddress = $(row).attr('href') || '';
    rowData['contract_address'] = contractAddress.split('/')[2];

    // Iterate over each cell with class 'ds-table-data-cell'
    $(row).find('.ds-table-data-cell').each((cellIndex, cell) => {
      const key = keys[cellIndex];
      if (key) {
        if (key === 'token') {
          // Extract detailed information for the Token cell
          const tokenCell = $(cell);

          const tokenData: TokenData = {
            number: tokenCell.find('.ds-dex-table-row-badge-pair-no').text().trim(),
            chainLogoUrl: tokenCell.find('.ds-dex-table-row-chain-icon').attr('src'),
            dexLogoUrl: tokenCell.find('.ds-dex-table-row-dex-icon').attr('src'),
            tokenSymbol: tokenCell.find('.ds-dex-table-row-base-token-symbol').text().trim(),
            chainSymbol: tokenCell.find('.ds-dex-table-row-quote-token-symbol').text().trim(),
            tokenImageUrl: tokenCell.find('.ds-dex-table-row-token-icon').attr('src'),
            tokenName: tokenCell.find('.ds-dex-table-row-base-token-name').text().trim()
          };

          rowData[key] = tokenData;
        } else {
          // Extract simple text data for other keys
          rowData[key] = $(cell).text().trim();
        }
      }
    });

    if (Object.keys(rowData).length > 0) {
      rows.push(rowData);
    }
  });

  // Write the parsed data to a JSON file
  fs.writeFileSync('data.json', JSON.stringify(rows, null, 2));
  console.log('Data successfully written to data.json.');

  // Upsert the parsed data into Supabase
  const { data, error } = await supabase
    .from('tokens')
    .upsert(rows, { onConflict: 'contract_address' });

  if (error) {
    console.error('Error upserting data into Supabase:', error);
  } else {
    console.log('Data successfully upserted into Supabase:', data);
  }
}

// Export the function for external usage
export { parseHtmlToSupabase };
