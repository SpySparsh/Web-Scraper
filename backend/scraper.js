const puppeteer = require('puppeteer');

async function scrapeGoogle(query) {
  const browser = await puppeteer.launch({
    headless: 'new',
    // CRITICAL: This points to the Chrome we installed via the build script
    executablePath: '/usr/bin/google-chrome-stable', 
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--single-process',
      '--no-zygote'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set a generic User Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    // Go to DuckDuckGo HTML version (Fast & Reliable)
    await page.goto('https://html.duckduckgo.com/html/', { waitUntil: 'domcontentloaded' });

    // Find the search input
    const searchInputSelector = 'input[name="q"]';
    await page.waitForSelector(searchInputSelector);
    
    // Type the query
    await page.type(searchInputSelector, query);
    
    // Submit
    await page.keyboard.press('Enter');
    
    // Wait for results container
    await page.waitForSelector('.result', { timeout: 10000 });

    // Scrape the data
    const results = await page.evaluate(() => {
      const data = [];
      const items = document.querySelectorAll('.result');

      items.forEach((item) => {
        const titleEl = item.querySelector('.result__title a');
        const snippetEl = item.querySelector('.result__snippet');

        if (titleEl) {
          data.push({
            title: titleEl.innerText.trim(),
            link: titleEl.href,
            snippet: snippetEl ? snippetEl.innerText.trim() : ''
          });
        }
      });
      return data;
    });
    
    return results.slice(0, 10);

  } catch (error) {
    console.error("Puppeteer Error:", error);
    throw error; 
  } finally {
    if (browser) {
        await browser.close();
    }
  }
}

module.exports = scrapeGoogle;
