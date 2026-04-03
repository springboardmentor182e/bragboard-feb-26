import puppeteer from 'puppeteer';

(async () => {
  console.log('\n=== ShoutoutDetailsModal Verification Test ===\n');
  
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  let consoleErrors = [];
  let consoleWarnings = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });
  
  try {
    console.log('1. Loading admin dashboard at http://localhost:5173/admin/shoutouts');
    await page.goto('http://localhost:5173/admin/shoutouts', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('✓ Page loaded');
    
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('\n2. Looking for Eye button (View Details)...');
    const clickedButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      for (let btn of buttons) {
        const html = btn.innerHTML;
        if (html.includes('Eye')) {
          btn.click();
          return 'clicked';
        }
      }
      return null;
    });
    
    if (clickedButton) {
      console.log('✓ Clicked Eye button');
      await new Promise(r => setTimeout(r, 1500));
      
      const modalInfo = await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return { found: false };
        
        return {
          found: true,
          isVisible: modal.offsetHeight > 0,
          hasSenderSection: !!modal.textContent.match(/SENDER/i),
          hasRecipientsSection: !!modal.textContent.match(/Recipients/i),
          hasMessageSection: !!modal.textContent.match(/Message/i),
          hasReactionsSection: !!modal.textContent.match(/REACTIONS/i),
          hasCommentsSection: !!modal.textContent.match(/COMMENTS/i),
          hasAdminActionsSection: !!modal.textContent.match(/ADMIN ACTIONS/i),
          textPreview: modal.textContent.substring(0, 200)
        };
      });
      
      console.log('\n3. Modal Status:');
      console.log('  ✓ Modal Found:', modalInfo.found);
      if (modalInfo.found) {
        console.log('  ✓ Modal Visible:', modalInfo.isVisible);
        console.log('\n4. Modal Sections:');
        console.log('  ' + (modalInfo.hasSenderSection ? '✓' : '✗') + ' Sender Section');
        console.log('  ' + (modalInfo.hasRecipientsSection ? '✓' : '✗') + ' Recipients Section');
        console.log('  ' + (modalInfo.hasMessageSection ? '✓' : '✗') + ' Message Section');
        console.log('  ' + (modalInfo.hasReactionsSection ? '✓' : '✗') + ' Reactions Section');
        console.log('  ' + (modalInfo.hasCommentsSection ? '✓' : '✗') + ' Comments Section');
        console.log('  ' + (modalInfo.hasAdminActionsSection ? '✓' : '✗') + ' Admin Actions Section');
      }
    } else {
      console.log('✗ Could not click Eye button');
    }
    
  } catch (err) {
    console.error('✗ Test error:', err.message);
  }
  
  console.log('\n5. Console Diagnostics:');
  if (consoleErrors.length > 0) {
    console.log('✗ Console Errors Found:');
    consoleErrors.forEach((err, i) => console.log(`  [${i+1}] ${err.substring(0, 150)}`));
  } else {
    console.log('✓ No console errors');
  }
  
  await browser.close();
  console.log('\n=== Test Complete ===\n');
})();
