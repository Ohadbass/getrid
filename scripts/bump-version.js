const fs = require("fs");
const path = require("path");

const packagePath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

const parts = pkg.version.split(".").map(Number);
if (parts.length !== 3 || parts.some(Number.isNaN)) {
  console.error(`Invalid version: ${pkg.version}`);
  process.exit(1);
}

parts[2] += 1;
pkg.version = parts.join(".");

fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(pkg.version);
