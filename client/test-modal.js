const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  let consoleLogs = [];
  let consoleErrors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else {
      consoleLogs.push(${msg.type()}: );
    }
  });
  
  page.on('error', err => {
    consoleErrors.push(Page error: );
  });
  
  try {
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('Page loaded. Waiting 2 seconds...');
    await page.waitForTimeout(2000);
    
    console.log('Looking for eye button...');
    
    const eyeButtonSelectors = [
      'button[title*="iew"]',
      'button[aria-label*="Details"]',
      '[data-testid="details-btn"]',
      'button:has(svg)',
      'button'
    ];
    
    let clicked = false;
    for (const selector of eyeButtonSelectors) {
      const btn = await page.test-modal.js(selector);
      if (btn.length > 0) {
        console.log(Found  buttons with selector: );
        if (selector === 'button:has(svg)' || selector === 'button') {
          for (let i = 0; i < Math.min(3, btn.length); i++) {
            try {
              console.log(Trying button ...);
              await btn[i].click();
              clicked = true;
              await page.waitForTimeout(1000);
              break;
            } catch (e) {}
          }
        } else {
          await btn[0].click();
          clicked = true;
          await page.waitForTimeout(1000);
        }
        if (clicked) break;
      }
    }
    
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Page content preview (first 800 chars): ' + bodyText.substring(0, 800));
    
  } catch (err) {
    console.error('Test error:', err.message);
  }
  
  console.log('\\n=== Console Output ===');
  consoleLogs.forEach(log => console.log(log));
  
  if (consoleErrors.length > 0) {
    console.log('\\n=== Console Errors ===');
    consoleErrors.forEach(err => console.error(err));
  } else {
    console.log('\\nNo console errors detected');
  }
  
  await browser.close();
})();
