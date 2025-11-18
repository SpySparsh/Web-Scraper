const puppeteer = require('puppeteer');

async function scrapeGoogle(query) {
  // 1. Launch the browser
  // We keep headless: false so you can see it working.
  const browser = await puppeteer.launch({
    headless: 'new', // MUST be headless in production
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--single-process', // Helps on low-memory free tiers
      '--no-zygote'
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();
    
    // 2. Go to DuckDuckGo (HTML Version)
    // This version is faster, lighter, and has NO aggressive anti-bot/CAPTCHA checks.
    // It is perfect for a portfolio project because it won't crash with 500 errors.
    await page.goto('https://html.duckduckgo.com/html/', { waitUntil: 'domcontentloaded' });

    // 3. Find the search input and type the query
    // The name of the input field on this page is "q"
    const searchInputSelector = 'input[name="q"]';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, query);
    
    // 4. Submit the form
    await page.keyboard.press('Enter');
    
    // 5. Wait for results to load
    // The class '.result' is the container for each search result
    await page.waitForSelector('.result', { timeout: 10000 });

    // 6. Scrape the data
    const results = await page.evaluate(() => {
      const data = [];
      const items = document.querySelectorAll('.result');

      items.forEach((item) => {
        // Extract title anchor tag and snippet div
        const titleEl = item.querySelector('.result__title a');
        const snippetEl = item.querySelector('.result__snippet');

        // Only add if we found a title link
        if (titleEl) {
          data.push({
            title: titleEl.innerText.trim(),
            link: titleEl.href,
            // Handle cases where snippet might be missing
            snippet: snippetEl ? snippetEl.innerText.trim() : 'No snippet available'
          });
        }
      });
      return data;
    });
    
    // Return top 10 results
    return results.slice(0, 10);

  } catch (error) {
    console.error("Puppeteer Error:", error);
    // This re-throws the error so your backend knows something went wrong
    throw error; 
  } finally {
    // Always close the browser, even if there was an error
    await browser.close();
  }
}

module.exports = scrapeGoogle;