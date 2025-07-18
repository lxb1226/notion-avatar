const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image conversion script to generate WebP and AVIF versions
async function convertImages() {
  const publicDir = path.join(__dirname, '../public');
  const imageDir = path.join(publicDir, 'image');
  
  if (!fs.existsSync(imageDir)) {
    console.log('Image directory not found');
    return;
  }

  const files = fs.readdirSync(imageDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} images to convert`);

  for (const file of imageFiles) {
    const inputPath = path.join(imageDir, file);
    const baseName = path.parse(file).name;
    
    try {
      // Convert to WebP
      const webpPath = path.join(imageDir, `${baseName}.webp`);
      if (!fs.existsSync(webpPath)) {
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(webpPath);
        console.log(`✓ Created ${baseName}.webp`);
      }

      // Convert to AVIF (more aggressive compression)
      const avifPath = path.join(imageDir, `${baseName}.avif`);
      if (!fs.existsSync(avifPath)) {
        await sharp(inputPath)
          .avif({ quality: 75, effort: 9 })
          .toFile(avifPath);
        console.log(`✓ Created ${baseName}.avif`);
      }

      // Optimize original
      const optimizedPath = path.join(imageDir, `${baseName}_optimized${path.parse(file).ext}`);
      if (!fs.existsSync(optimizedPath)) {
        if (path.parse(file).ext.toLowerCase() === '.png') {
          await sharp(inputPath)
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(optimizedPath);
        } else {
          await sharp(inputPath)
            .jpeg({ quality: 85, progressive: true })
            .toFile(optimizedPath);
        }
        console.log(`✓ Optimized ${file}`);
      }

    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Also convert social.png if it exists
  const socialPath = path.join(publicDir, 'social.png');
  if (fs.existsSync(socialPath)) {
    try {
      const webpPath = path.join(publicDir, 'social.webp');
      const avifPath = path.join(publicDir, 'social.avif');
      
      if (!fs.existsSync(webpPath)) {
        await sharp(socialPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(webpPath);
        console.log('✓ Created social.webp');
      }

      if (!fs.existsSync(avifPath)) {
        await sharp(socialPath)
          .avif({ quality: 75, effort: 9 })
          .toFile(avifPath);
        console.log('✓ Created social.avif');
      }
    } catch (error) {
      console.error('Error processing social.png:', error.message);
    }
  }

  console.log('Image conversion completed!');
}

// Run if called directly
if (require.main === module) {
  convertImages().catch(console.error);
}

module.exports = convertImages;
