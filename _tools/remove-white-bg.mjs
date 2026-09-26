import { Jimp } from 'jimp';

const input = process.argv[2] || 'C:/DSH/magic-house/assets-gen/chars/char-base.png';
const output = process.argv[3] || 'C:/DSH/magic-house/assets-gen/chars/char-base-nobg.png';

const img = await Jimp.read(input);
console.log('loaded:', input, img.bitmap.width, 'x', img.bitmap.height);

const channels = img.bitmap.data.length / (img.bitmap.width * img.bitmap.height);
console.log('channels:', channels);

if (channels === 3) {
  // extend RGB -> RGBA
  const oldData = img.bitmap.data;
  const newData = new Uint8Array(oldData.length / 3 * 4);
  for (let i = 0, j = 0; i < oldData.length; i += 3, j += 4) {
    newData[j] = oldData[i];
    newData[j + 1] = oldData[i + 1];
    newData[j + 2] = oldData[i + 2];
    newData[j + 3] = 255;
  }
  img.bitmap.data = newData;
}

let removed = 0;
let half = 0;
img.scan((x, y, idx) => {
  const r = img.bitmap.data[idx];
  const g = img.bitmap.data[idx + 1];
  const b = img.bitmap.data[idx + 2];
  if (r > 245 && g > 245 && b > 245) {
    img.bitmap.data[idx + 3] = 0;
    removed++;
  } else if (r > 225 && g > 225 && b > 225) {
    const min = Math.min(r, g, b);
    const a = Math.min(255, Math.max(0, (255 - min) * 6)) | 0;
    img.bitmap.data[idx + 3] = a;
    half++;
  }
});
console.log('removed:', removed, 'half:', half);

await img.write(output);
console.log('saved:', output);