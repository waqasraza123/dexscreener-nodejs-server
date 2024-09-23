const puppeteer = require('puppeteer');

async function scrapeSolscan() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://solscan.io/token/FEN72JRg6uxbE4sXVJa4kJCWgvEBA5yqeQ1iCu1Npump');

    // Find and click the button using evaluate method
    await page.evaluate(() => {
        const holdersButton = Array.from(document.querySelectorAll('button')).find(
            btn => btn.innerText === 'Holders'
        );
        if (holdersButton) {
            console.log("found button")
            holdersButton.click();
        }
    });

    // Add scraping logic here if needed after the button click
    const data = await page.evaluate(() => {
        const balance = document.querySelector('.viewport-scroll-area')?.innerText;
        return { balance };
    });

    console.log(data);
    //await browser.close();
}

scrapeSolscan();
