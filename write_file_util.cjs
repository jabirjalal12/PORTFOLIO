const fs = require('fs');
const path = require('path');
const target = process.argv[2];
const src = process.argv[3];
if (!target || !src) {
  console.error('Usage: node write_file_util.cjs <target> <src_file_or_b64>');
  process.exit(1);
}
const fullTarget = path.resolve(process.cwd(), target);
fs.mkdirSync(path.dirname(fullTarget), { recursive: true });
if (fs.existsSync(src)) {
  fs.copyFileSync(src, fullTarget);
  console.log('Copied ' + src + ' to ' + target);
} else {
  fs.writeFileSync(fullTarget, Buffer.from(src, 'base64').toString('utf8'), 'utf8');
  console.log('Wrote ' + target);
}
