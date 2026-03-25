import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const images = [
  { name: 'logo.png', sizes: [200] },
  { name: 'interior_clinica.png', sizes: [1200, 600] },
  { name: 'interior_clinica2.png', sizes: [600, 400] },
  { name: 'clinica_por_fora.png', sizes: [600, 400] }
];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(publicDir, img.name);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img.name}, not found.`);
      continue;
    }

    const { name } = path.parse(img.name);
    
    for (const size of img.sizes) {
      const outputPath = path.join(publicDir, `${name}-${size}.webp`);
      await sharp(inputPath)
        .resize(size)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Generated ${outputPath}`);
    }

    // Delete the original heavy png file
    fs.unlinkSync(inputPath);
    console.log(`Deleted original ${inputPath}`);
  }
}

optimize().then(() => console.log('Optimization complete!')).catch(console.error);
