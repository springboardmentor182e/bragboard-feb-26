import puppeteer from "puppeteer";

(async () => {
  console.log("\n=== Browser Console Check ===\n");
  
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  
  let consoleErrors = [];
  let consoleWarnings = [];
  let pageLoadSuccess = true;
  
  page.on("console", msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === "error") {
      consoleErrors.push(text);
    } else if (type === "warning") {
      consoleWarnings.push(text);
    }
  });
  
  page.on("error", err => {
    console.error("Page crashed:", err);
    pageLoadSuccess = false;
  });
  
  try {
    console.log("1. Loading admin shoutouts page...");
    await page.goto("http://localhost:5173/admin/shoutouts", { 
      waitUntil: "networkidle2", 
      timeout: 30000 
    });
    console.log("   ✓ Page loaded successfully");
    
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("\n2. Console Errors:");
    if (consoleErrors.length === 0) {
      console.log("   ✓ No errors detected");
    } else {
      console.log("   ✗ Errors found:");
      consoleErrors.forEach((err, i) => {
        console.log("     [" + (i+1) + "] " + err.substring(0, 200));
      });
    }
    
    console.log("\n3. Console Warnings:");
    if (consoleWarnings.length === 0) {
      console.log("   ✓ No warnings detected");
    } else {
      console.log("   ✗ Warnings found:");
      consoleWarnings.forEach((warn, i) => {
        console.log("     [" + (i+1) + "] " + warn.substring(0, 200));
      });
    }
    
  } catch (err) {
    console.error("✗ Page load error:", err.message);
    pageLoadSuccess = false;
  }
  
  await browser.close();
  console.log("\n=== Check Complete ===\n");
})();
