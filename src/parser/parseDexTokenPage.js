const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const antibotbrowser = require('antibotbrowser');

// Define the keys for each item
const keys = [
  'token', 'price', 'age', 'txns', 'volume', 'makers', '5m', '1h', '6h', '24h', 'liquidity', 'mcap'
];

// Function to scrape and save HTML from a new URL based on contract address
async function saveTokenTransactions(chainId, contractAddress) {

    const url = `https://dexscreener.com/${chainId}/${contractAddress}`;
    console.log('url is ' + url);

    const antibrowser = await antibotbrowser.startbrowser(9222, "https://dexscreener.com");
    console.log('Antibrowser started. WebSocket URL:', antibrowser.websokcet);

    if (!antibrowser.websokcet) {
        throw new Error('WebSocket URL is not defined.');
    }

    const browser = await puppeteer.connect({ browserWSEndpoint: antibrowser.websokcet });
    console.log('Connected to Puppeteer browser.');

    const page = await browser.newPage();
    console.log('New page created.');

    await page.setViewport({ width: 1280, height: 800 });
    console.log('Viewport size set.');

    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 15000)); // sleep for 15 seconds

    // Extract the table's inner HTML
    const tableHTML = await page.evaluate(() => {
        const table = document.querySelector('div.custom-19qkkht');
        return table ? table.innerHTML : null;
    });

    if (!tableHTML) {
        console.error('No table found with the specified class.');
        return;
    }

    // Save the HTML content
    const fileName = `${chainId}_${contractAddress}.html`;
    fs.writeFileSync(fileName, tableHTML);
    console.log(`HTML content saved to ${fileName}`);

    // Parse the table HTML using Cheerio
    const relativePath = '../../solana_7oguisxbogr7o3o713dpe1ph2uwixtlbi4zabmapvgsw.html';
    const absolutePath = path.resolve(__dirname, relativePath);
    const $ = cheerio.load(fs.readFileSync(absolutePath, 'utf8'));
    //await browser.close();
    const rows = [];

    // Extract headers
    const headers = [];

    $('th').each((index, th) => {
        // Extract text directly or from nested elements
        const headerText = $(th).text().trim();
        
        if (headerText) {
            headers.push(headerText);
        } else {
            console.warn(`Header ${index} is empty or not found.`);
        }
    });

    // Extract rows data
    $('tbody tr').each((index, row) => {
        const rowData = {};
    
        $(row).find('td div').each((cellIndex, cell) => {
            const key = headers[cellIndex];
            console.log(key, $(cell).text().trim())
            if (key) {
                let cellText;
                if(key.toLowerCase() === 'maker' || key.toLowerCase() === 'txn'){
                    cellText = $(cell).find('a').attr('href');
                }else{
                    cellText = $(cell).text().trim();
                }
    
                // Split by \n, filter out empty strings, and save as an array
                const cellArray = cellText.split('\n').map(text => text.trim()).filter(text => text !== '');
                rowData[key] = cellArray.length > 1 ? cellArray : cellArray[0]; // Save as array if multiple elements, otherwise as a string
            }
        });
    
        // Add rowData to rows array only if it has some data (i.e., it's not empty)
        if (Object.keys(rowData).length > 0) {
            rows.push(rowData);
        }
    });



    // Write the parsed data to a JSON file
    //console.log(rows, headers)
    fs.writeFileSync('table_data.json', JSON.stringify(rows, null, 2));
    console.log('Data successfully written to table_data.json.');
}

// Function to parse the table HTML from a file
async function parseHtmlFile(htmlFilePath) {
    // Read the HTML file
    const html = fs.readFileSync(htmlFilePath, 'utf-8');

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    const rows = [];

    // Iterate over each row with class 'ds-dex-table-row'
    $('.ds-dex-table-row').each(async (index, row) => {

        // temp break after the first row
        if (index >= 1) return;

        console.log(index);

        const rowData = {};

        // Extract Contract_Address from href attribute in anchor tag
        const anchor = $(row);
        const href = anchor.attr('href') || '';
        const contractAddress = href.split('/')[2];
        const chainId = href.split('/')[1]; // Extract chainId from the href

        console.log(chainId, contractAddress);

        rowData['contract_address'] = contractAddress;

        // Iterate over each cell with class 'ds-table-data-cell'
        $(row).find('.ds-table-data-cell').each((cellIndex, cell) => {
            const key = keys[cellIndex];
            if (key) {
                if (key === 'token') {
                    // Extract detailed information for the Token cell
                    const tokenCell = $(cell);

                    const tokenData = {
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

        if (Object.keys(rowData).length > 1) {
            rows.push(rowData);

            // Scrape and save the HTML for this contract address
            await saveTokenTransactions(chainId, contractAddress);
        }

    });

    // Write the parsed data to a JSON file
    fs.writeFileSync('data.json', JSON.stringify(rows, null, 2));
    console.log('Data successfully written to data.json.');
}

// Utility function to pause execution for a given time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Call the function with your HTML file path
const htmlFilePath = './table.html'; // Update this to the actual path of your HTML file
parseHtmlFile(htmlFilePath);

// Export the function for external usage
module.exports = { parseHtmlFile };
