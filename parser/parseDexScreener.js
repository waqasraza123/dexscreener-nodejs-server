const antibotbrowser = require("antibotbrowser");
const puppeteer = require('puppeteer');
const fs = require('fs');
const { parseHtmlToSupabase } = require('./parseHtmlToJson');

// Custom function to handle timeout
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    let success = false;

    while (!success) {
        try {
            // Start the browser using antibotbrowser
            const antibrowser = await antibotbrowser.startbrowser(9222, "https://dexscreener.com");
            console.log('Antibrowser started. WebSocket URL:', antibrowser.websokcet);

            // Check if the WebSocket URL is defined
            if (!antibrowser.websokcet) {
                throw new Error('WebSocket URL is not defined.');
            }

            // Connect Puppeteer to the browser started by antibotbrowser
            const browser = await puppeteer.connect({ browserWSEndpoint: antibrowser.websokcet });
            console.log('Connected to Puppeteer browser.');

            // Create a new page
            const page = await browser.newPage();
            console.log('New page created.');

            // Set viewport size
            await page.setViewport({ width: 1280, height: 800 });
            console.log('Viewport size set.');

            // Navigate to the target URL
            await page.goto('https://dexscreener.com', { waitUntil: 'networkidle2' });
            console.log('Navigated to https://dexscreener.com');

            await sleep(15000)

            // Extract inner HTML from ds-dex-table class
            const htmlContent = await page.evaluate(() => {
                const table = document.querySelector('.ds-dex-table');
                return table ? table.innerHTML : null;
            });

            if (htmlContent) {
                // Save HTML content to file
                fs.writeFileSync('table.html', htmlContent);
                console.log('Table HTML content saved to table.html');
                
                // Call the function to parse HTML and save as JSON
                parseHtmlToSupabase('table.html', 'data.json');

                success = true; // Exit the loop if successful
            } else {
                console.error('No table found with class ds-dex-table. Retrying...');
            }

            // Close the browser before retrying
            await browser.close();
        } catch (error) {
            console.error('Error:', error);
        }

        // Wait before retrying to avoid overwhelming the server
        if (!success) {
            console.log('Retrying in 10 seconds...');
            await sleep(10000);
        }
    }
})();
