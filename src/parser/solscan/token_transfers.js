const fs = require('fs');
const axios = require('axios');
const csvParser = require('csv-parser');
const supabase = require('../../config/supabaseClient');

const contract_address = "FEN72JRg6uxbE4sXVJa4kJCWgvEBA5yqeQ1iCu1Npump";

// Function to fetch token transfer data from Solscan API
async function fetchTokenTransfers() {
    const url = `https://api-v2.solscan.io/v2/token/transfer/export?address=${contract_address}&exclude_amount_zero=true`;

    try {
        // Fetch data from Solscan API
        const response = await axios.get(url, { responseType: 'stream' });

        console.log('Transfer data retrieved from Solscan.');

        // Parse CSV data and transform it to JSON
        parseCSVAndSaveToSupabase(response.data);

    } catch (error) {
        console.error('Error fetching data from Solscan API:', error);
    }
}

// Function to parse CSV and save to Supabase
function parseCSVAndSaveToSupabase(stream) {
    const results = [];

    stream
        .pipe(csvParser())
        .on('data', (row) => {
            // Transform the row into the expected JSON structure
            results.push({
                contract_address: row.TokenAddress,
                signature: row.Signature,
                time: row.Time,
                action: row.Action,
                from: row.From,
                to: row.To,
                change_amount: parseFloat(row.Amount) / Math.pow(10, row.Decimals),
            });
        })
        .on('end', async () => {
            console.log('CSV data parsed and transformed into JSON.');
            console.log(results);

            // Remove duplicates based on signature
            const uniqueResults = results.reduce((acc, current) => {
                if (!acc.some(row => row.signature === current.signature)) {
                    acc.push(current);
                }
                return acc;
            }, []);

            // Insert data into Supabase
            try {
                const { data, error } = await supabase
                    .from('token_transfers')
                    .upsert(uniqueResults, { onConflict: ['signature'] });

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

// Run the fetch and insert function
fetchTokenTransfers();
