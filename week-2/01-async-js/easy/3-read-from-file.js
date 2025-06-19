const fs = require("fs");

fs.readFile("3-read-from-file.md", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("--- File Contents ---");
  console.log(data);
});

console.log("Starting expensive operation...");
let sum = 0;
for (let i = 0; i < 1e9; i++) {
  sum += i;
}
console.log(sum);