const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, './assets');
const destDir = path.join(__dirname, './public/.well-known');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('❌ Failed to read source directory:', err);
    process.exit(1);
  }

  files.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
  
    fs.copyFile(sourceFile, destFile, (err) => {
      if (err) {
        console.error(`❌ Failed to copy ${file}:`, err);
      } else {
        console.log(`✅ Copied ${file} → ${file} to ${destDir}`);
      }
    });
  });
});