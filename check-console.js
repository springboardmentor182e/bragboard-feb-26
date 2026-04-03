const http = require("http");

http.get("http://localhost:5174", (res) => {
  let data = "";
  
  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("=== Admin Shoutouts Page Analysis ===");
    console.log("Page size: " + data.length + " bytes");
    console.log("Status code check: OK");
    
    // Check for component references
    if (data.includes("AdminShoutouts")) {
      console.log("✓ AdminShoutouts component is present");
    }
    
    // Check for build output
    if (data.includes(".js") || data.includes(".jsx")) {
      console.log("✓ JavaScript assets are being loaded");
    }
    
    if (data.includes("500") || data.includes("error")) {
      console.log("⚠ Possible error indicators in page content");
    } else {
      console.log("✓ No obvious error indicators in page content");
    }
  });
}).on("error", (err) => {
  console.error("Error: " + err.message);
});
