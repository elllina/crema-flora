const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../assets/cakes');
const outputDir = inputDir; // Save in the same directory

// Quality settings for WebP
const WEBP_QUALITY = 85; // High quality, good compression

async function convertToWebP() {
  try {
    const files = fs.readdirSync(inputDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    console.log(`Found ${pngFiles.length} PNG images to convert...\n`);

    for (const file of pngFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);

      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      // Get new file size
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);

      console.log(`✓ ${file}`);
      console.log(`  Original: ${originalSize} MB → WebP: ${newSize} MB (${savings}% smaller)\n`);
    }

    console.log('✅ All images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
    process.exit(1);
  }
}

convertToWebP();
