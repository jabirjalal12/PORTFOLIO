const fs = require('fs');
const path = require('path');
const file = process.argv[2];
const search = process.argv[3];
const replace = process.argv[4];

if (!file || search === undefined || replace === undefined) {
  console.error('Usage: node replace_util.cjs <file> <search> <replace>');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), file);
let content = fs.readFileSync(fullPath, 'utf8');
if (!content.includes(search)) {
  console.error('Target string not found in ' + file);
  process.exit(1);
}
content = content.replace(search, replace);
fs.writeFileSync(fullPath, content, 'utf8');
console.log('Successfully updated ' + file);
