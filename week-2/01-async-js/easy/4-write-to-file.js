const fs = require("fs");

try {
  const content = fs.readFileSync("4-write-to-file.md", "utf-8");

  if (!content || content.trim() === "") {
    console.log("There is nothing to write");
    return;
  }

  fs.writeFile("output.txt", content, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully");
  });
} catch (err) {
  console.error("Error reading file:", err);
}
