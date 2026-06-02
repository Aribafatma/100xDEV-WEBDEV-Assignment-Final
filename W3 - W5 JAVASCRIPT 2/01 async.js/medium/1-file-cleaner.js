const fs = require("fs");

const filename = "input.txt"; // Change to your file name

// Read file content
fs.readFile(filename, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Replace multiple spaces with a single space
  let cleaned = data.replace(/\s+/g, " ").trim();

  // Write cleaned content back to the same file
  fs.writeFile(filename, cleaned, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File cleaned successfully!");
  });
});
