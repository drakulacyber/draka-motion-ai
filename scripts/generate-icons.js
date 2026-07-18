const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputImage = process.argv[2] || path.join(__dirname, '..', '..', '..', '..', '.gemini', 'antigravity', 'brain', '685a5a5c-8113-43de-bb19-6bf13dc8bb01', 'draka_app_icon_1784346052056.jpg');
const outputDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(inputImage)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated icon-${size}x${size}.png`);
  }

  // Also create favicon
  await sharp(inputImage)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));
  console.log('✓ Generated favicon.png');

  console.log('\\n✅ All icons generated!');
}

generateIcons().catch(console.error);
