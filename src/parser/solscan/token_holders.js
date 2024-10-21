const axios = require('axios');
const fs = require('fs');
const csvParser = require('csv-parser');
const supabase = require('../../config/supabaseClient');

const tokenAddress = "3xhezws6Lk7cMqoVEfZFXu3ry9GKymFz1vbWyQ4f99uX";
const url = `https://api-v2.solscan.io/v2/token/holder/export?address=${tokenAddress}`;

// Function to fetch and save token holders to Supabase
async function fetchTokenHolders() {
    try {
        // Fetch CSV data from Solscan
        const response = await axios.get(url, {
            responseType: 'stream'
        });

        const csvFileName = 'token_holders_data.csv';
        const writer = fs.createWriteStream(csvFileName);
        response.data.pipe(writer);

        writer.on('finish', () => {
            parseCsvAndSaveToSupabase(csvFileName);
        });

        writer.on('error', (err) => {
            console.error('Error writing CSV file:', err);
        });

    } catch (error) {
        console.error('Error fetching token holders:', error);
    }
}

// Function to parse CSV and save the data into Supabase
function parseCsvAndSaveToSupabase(fileName) {
    let jsonData = [];

    fs.createReadStream(fileName)
        .pipe(csvParser())
        .on('data', (row) => {
            // Map CSV data to your Supabase columns
            jsonData.push({
                account: row['Account'],
                token_account: row['Token Account'],
                quantity: parseFloat(row['Quantity']),
                percentage: parseFloat(row['Percentage']),
                contract_address: tokenAddress // Add contract_address for each row
            });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');

            // Remove duplicates based on token_account (if needed)
            const uniqueJsonData = jsonData.reduce((acc, current) => {
                if (!acc.some(row => row.token_account === current.token_account)) {
                    acc.push(current);
                }
                return acc;
            }, []);

            // Insert data into Supabase
            try {
                const { data, error } = await supabase
                    .from('token_holders')
                    .upsert(uniqueJsonData, { onConflict: ['token_account'] });

                if (error) {
                    console.error('Error upserting data into Supabase:', error);
                } else {
                    console.log('Data successfully upserted into Supabase:', data);
                }
            } catch (supabaseError) {
                console.error('Supabase error:', supabaseError);
            }
        });
}

// Run the function
fetchTokenHolders();
