// Usage: node remove-white-bg.cjs <input.jpg|.png> <output.png>
const Jimp = require('jimp');
const fs = require('fs');

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) {
  console.error('Usage: node remove-white-bg.cjs <input> <output.png>');
  process.exit(1);
}

(async () => {
  const img = await Jimp.read(input);
  console.log('loaded:', input, img.bitmap.width, 'x', img.bitmap.height);

  const pxCount = img.bitmap.width * img.bitmap.height;
  if (img.bitmap.data.length === pxCount * 3) {
    const oldData = img.bitmap.data;
    const newData = Buffer.alloc(pxCount * 4);
    for (let i = 0, j = 0; i < oldData.length; i += 3, j += 4) {
      newData[j] = oldData[i];
      newData[j + 1] = oldData[i + 1];
      newData[j + 2] = oldData[i + 2];
      newData[j + 3] = 255;
    }
    img.bitmap.data = newData;
  }

  let removed = 0, half = 0;
  const d = img.bitmap.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    if (r > 245 && g > 245 && b > 245) {
      d[i + 3] = 0;
      removed++;
    } else if (r > 220 && g > 220 && b > 220) {
      const min = Math.min(r, g, b);
      d[i + 3] = Math.min(255, Math.max(0, (255 - min) * 6)) | 0;
      half++;
    }
  }
  console.log('removed:', removed, 'half:', half);

  // Use getBuffer + writeFileSync (more reliable than img.write on Win32)
  img.getBuffer(Jimp.MIME_PNG, (err, buf) => {
    if (err) { console.error('getBuffer err:', err); process.exit(1); }
    fs.writeFileSync(output, buf);
    const stat = fs.statSync(output);
    console.log('saved:', output, '(' + stat.size + ' bytes)');
  });
})().catch(e => { console.error(e); process.exit(1); });