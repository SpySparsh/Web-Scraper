const puppeteer = require('puppeteer');

async function scrapeGoogle(query) {
  const browser = await puppeteer.launch({
    headless: 'new',
    // These args are CRITICAL for Docker environments
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // Fixes memory issues in Docker
      '--disable-gpu',
      '--single-process',
      '--no-zygote'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set a standard User Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    const targetUrl = 'https://html.duckduckgo.com/html/';
    
    // Log navigation for debugging (check Render logs for this!)
    console.log(`Navigating to: ${targetUrl}`);

    await page.goto(targetUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 // 30 second timeout
    });

    const searchInputSelector = 'input[name="q"]';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, query);
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.keyboard.press('Enter'),
    ]);

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
    console.error("Scraping Error Log:", error); // Better logging
    throw error; 
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = scrapeGoogle;
