const antibotbrowser = require('antibotbrowser');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { parseHtmlToSupabase } = require('./parseHtmlToJson');

async function parseDexScreener() {
    let success = false;

    while (!success) {
        try {
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

            await page.goto('https://dexscreener.com', { waitUntil: 'networkidle2' });
            console.log('Navigated to https://dexscreener.com');

            await sleep(15000);

            const htmlContent = await page.evaluate(() => {
                const table = document.querySelector('.ds-dex-table');
                return table ? table.innerHTML : null;
            });

            if (htmlContent) {
                fs.writeFileSync('table.html', htmlContent);
                console.log('Table HTML content saved to table.html');
                
                parseHtmlToSupabase('table.html');

                success = true;
            } else {
                console.error('No table found with class ds-dex-table. Retrying...');
            }

            await browser.close();
        } catch (error) {
            console.error('Error:', error);
        }

        if (!success) {
            console.log('Retrying in 10 seconds...');
            await sleep(10000);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = parseDexScreener;

parseDexScreener();
