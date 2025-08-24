const fs = require("fs");
const path = require("path");

// Read the file
const filePath = path.join(__dirname, "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Remove all hardcoded image properties since we're using dynamic images
content = content.replace(/,\s*image: "\/placeholder\.jpg"/g, "");

// Write back to file
fs.writeFileSync(filePath, content, "utf8");

console.log(
  "Removed hardcoded image properties - now using dynamic API images"
);
