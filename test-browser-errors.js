const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Capture console messages
    page.on('console', msg => {
      console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
    });
    
    // Capture page errors
    page.on('error', err => {
      console.error(`[PAGE ERROR] ${err}`);
    });
    
    // Capture uncaught exceptions
    page.on('pageerror', err => {
      console.error(`[UNCAUGHT ERROR] ${err.message}`);
      console.error(err.stack);
    });
    
    // Navigate to the admin shoutouts page
    console.log('Loading page: http://localhost:5173/admin/shoutouts');
    try {
      await page.goto('http://localhost:5173/admin/shoutouts', { waitUntil: 'networkidle2', timeout: 10000 });
      console.log('[SUCCESS] Page loaded successfully');
    } catch (e) {
      console.log('[WARNING] Page load message: ' + e.message);
    }
    
    // Wait a bit for any delayed errors
    await page.waitForTimeout(2000);
    
    // Get page title
    const title = await page.title();
    console.log(`[PAGE TITLE] ${title}`);
    
    // Check if redirected
    const url = page.url();
    console.log(`[FINAL URL] ${url}`);
    
  } catch (error) {
    console.error('[SCRIPT ERROR]', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
