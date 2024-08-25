const antibotbrowser = require("antibotbrowser");
const puppeteer = require('puppeteer');
const fs = require('fs');
const supabase = require('./config/supabaseClient');

// Custom function to handle timeout
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to extract token data and save it as JSON
async function extractTokenData(tokenContractAddress) {
    console.log(tokenContractAddress)
    let success = false;

    while (!success) {
        try {
            const antibrowser = await antibotbrowser.startbrowser(9222, `https://solsniffer.com/scanner/${tokenContractAddress}`);
            console.log('Antibrowser started. WebSocket URL:', antibrowser.websokcet);

            if (!antibrowser.websokcet) {
                throw new Error('WebSocket URL is not defined.');
            }

            const browser = await puppeteer.connect({ browserWSEndpoint: antibrowser.websokcet });
            console.log('Connected to Puppeteer browser.');

            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto(`https://solsniffer.com/scanner/${tokenContractAddress}`, { waitUntil: 'networkidle2' });
            console.log('Navigated to the token URL.');

            await sleep(15000)// sleep 15 sec

            const extractedData = await page.evaluate(() => {
                const data = [];

                // Select the main div with class 'index_div1__mLqmp'
                const mainDiv = document.querySelector('div.index_div1__mLqmp');
                if (mainDiv) {
                    // Find all divs with class 'flex-row' inside the main div
                    const flexRows = mainDiv.querySelectorAll('div.flex-row');

                    flexRows.forEach((flexRow) => {
                        const rowData = {};

                        // Extract text data from the flex-row div
                        rowData.text = flexRow.innerText;

                        // Extract icon URL from the flex-row div
                        const img = flexRow.querySelector('img');
                        if (img) {
                            rowData.icon_url = img.src;
                        }

                        // Only push the rowData if icon_url is present
                        if (rowData.icon_url) {
                            data.push(rowData);
                        }
                    });
                }

                // Extract sniff_score from the div with class 'd1024:z-[110]'
                const sniffScoreDiv = document.querySelector('div.d1024\\:z-\\[110\\]');
                if (sniffScoreDiv) {
                    data.sniff_score = sniffScoreDiv.innerText;
                }

                return data;
            });

            // Save the extracted data as JSON (you can adjust this to save to Supabase instead)
            fs.writeFileSync(`token_data_${tokenContractAddress}.json`, JSON.stringify(extractedData, null, 2));
            console.log(`Token data for ${tokenContractAddress} saved as JSON.`);

            success = true;
            //await browser.close();
        } catch (error) {
            console.error('Error:', error);
        }

        if (!success) {
            console.log('Retrying in 10 seconds...');
            await sleep(10000);
        }
    }
}

// Function to fetch tokens from Supabase and extract data for each
async function processTokens() {
    // Fetch tokens from Supabase
    const { data: tokens, error } = await supabase
        .from('tokens')
        .select('contract_address');

    if (error) {
        console.error('Error fetching tokens from Supabase:', error);
        return;
    }

    for (const token of tokens) {
        const contractAddress = token.contract_address;
        console.log(`Processing contract address: ${contractAddress}`);
        await extractTokenData(contractAddress);
        break; // Stop after the first iteration
    }
}

// Start processing
processTokens();
