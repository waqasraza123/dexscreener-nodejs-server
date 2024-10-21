const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const cheerio = require('cheerio');
const antibotbrowser = require('antibotbrowser');
const supabase = require('../config/supabaseClient');

// Use stealth plugin to avoid detection
puppeteer.use(stealthPlugin());

const contract_address = "FEN72JRg6uxbE4sXVJa4kJCWgvEBA5yqeQ1iCu1Npump";

async function scrapeSolscan() {
    const url = `https://solscan.io/token/${contract_address}?exclude_amount_zero=true`;
    try {
        const antibrowser = await antibotbrowser.startbrowser(9222, url);
        console.log('Antibrowser started. WebSocket URL:', antibrowser.websokcet);

        if (!antibrowser.websokcet) {
            throw new Error('WebSocket URL is not defined.');
        }

        const browser = await puppeteer.connect({ browserWSEndpoint: antibrowser.websokcet });
        console.log('Connected to Puppeteer browser.');

        // Open a new page
        const page = await browser.newPage();
        console.log('New page created.');

        // Set the viewport size
        await page.setViewport({ width: 1280, height: 800 });
        console.log('Viewport size set.');

        // Navigate to the Solscan token URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the page to load completely
        await sleep(15000); // Adjust as needed for page loading

        console.log('Navigated to the Solscan token page.');

        const htmlContent = await page.content();
        console.log('HTML content of the page retrieved.');

        const htmlFileName = 'token_transfers_data.html';
        fs.writeFileSync(htmlFileName, htmlContent);
        console.log(`Page HTML content saved to ${htmlFileName}.`);

        await browser.close();
        console.log('Browser closed.');

        // Parse the saved HTML file using cheerio and save data to Supabase
        parseHtmlToJsonAndSaveToSupabase(htmlFileName, contract_address);

    } catch (error) {
        console.error('Error occurred while scraping Solscan:', error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to parse HTML and save table data as JSON and then insert to Supabase
function parseHtmlToJsonAndSaveToSupabase(fileName, contract_address) {
    fs.readFile(fileName, 'utf-8', async (err, html) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return;
        }

        const $ = cheerio.load(html);
        const table = $('table.caption-bottom');

        if (!table.length) {
            console.error('Table with class "caption-bottom" not found.');
            return;
        }

        let jsonData = [];
        table.find('tbody tr').each((index, row) => {
            let rowData = {};
            const columnNames = [
                'contract_address',
                'signature',
                'time',
                'action',
                'from',
                'to',
                'change_amount',
                'token'
            ];

            rowData[columnNames[0]] = contract_address;

            $(row).find('td').each((i, cell) => {
                let cellText = $(cell).text().trim();

                if (columnNames[i] === 'from' || columnNames[i] === 'to') {
                    const anchorTag = $(cell).find('a');
                    if (anchorTag.length) {
                        const hrefValue = anchorTag.attr('href');
                        const accountId = hrefValue.split('/account/')[1];
                        
                        rowData[columnNames[i]] = {
                            text: cellText,
                            account_id: accountId
                        };
                    } else {
                        rowData[columnNames[i]] = {
                            text: cellText,
                            account_id: null
                        };
                    }
                } else if (i > 0) {
                    rowData[columnNames[i]] = cellText;
                }
            });

            jsonData.push(rowData);
        });

        const jsonFileName = 'token_transfers_data.json';
        fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));
        console.log(`Table data saved to ${jsonFileName}.`);

        // Remove duplicates from jsonData based on signature
        const uniqueJsonData = jsonData.reduce((acc, current) => {
            if (!acc.some(row => row.signature === current.signature)) {
                acc.push(current);
            }
            return acc;
        }, []);

        // Insert data into Supabase
        try {
            const { data, error } = await supabase
                .from('token_transfers')
                .upsert(uniqueJsonData, { onConflict: ['signature'] });

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

// Run the scraper
scrapeSolscan();
