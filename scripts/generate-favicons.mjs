import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function createPNG(width, height, drawFn) {
  // RGBA buffer
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (stride + 1);
    raw[rowOffset] = 0; // filter byte: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x / width, y / height, x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      raw[pixelOffset] = r;
      raw[pixelOffset + 1] = g;
      raw[pixelOffset + 2] = b;
      raw[pixelOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(raw);

  // PNG chunks
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // deflate
  ihdrData.writeUInt8(0, 11); // filter 0
  ihdrData.writeUInt8(0, 12); // no interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const typeBuf = Buffer.from(type, 'ascii');
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  typeBuf.copy(buf, 4);
  data.copy(buf, 8);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Exact Signed Distance Function for a 2D rounded rectangle in 0..1 space
function sdRoundedBox(x, y, bx, by, bw, bh, rad) {
  const cx = bx + bw / 2;
  const cy = by + bh / 2;
  const qx = Math.abs(x - cx) - (bw / 2 - rad);
  const qy = Math.abs(y - cy) - (bh / 2 - rad);
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  return Math.min(Math.max(qx, qy), 0) + Math.sqrt(ox * ox + oy * oy) - rad;
}

// Distance to circle in 0..1 space
function sdCircle(x, y, cx, cy, r) {
  const dx = x - cx;
  const dy = y - cy;
  return Math.sqrt(dx * dx + dy * dy) - r;
}

// Distance to a bar (vertical pill + circular head)
function sdBar(u, v, barCx, circleCy, circleR, barX, barW, barY, barH) {
  const dCirc = sdCircle(u, v, barCx, circleCy, circleR);
  const dRec = sdRoundedBox(u, v, barX, barY, barW, barH, barW / 2);
  return Math.min(dCirc, dRec);
}

// Draw the authentic Shaghal Logo onto icon canvas (White squircle + 2 Navy bars + 1 Emerald bar)
function drawShaghalLogo(u, v, px, py, width, height) {
  // Antialiasing radius in normalized units
  const aa = 1.4 / width;

  // Background: Clean high-contrast white squircle (#FFFFFF)
  const pad = 0.035;
  const squircleRad = 0.22;
  const dSquircle = sdRoundedBox(u, v, pad, pad, 1 - 2 * pad, 1 - 2 * pad, squircleRad);

  if (dSquircle > aa) {
    return [0, 0, 0, 0]; // Transparent outside squircle
  }

  // Pure clean white background (#FFFFFF) with gentle anti-aliased edge
  let bgR = 255, bgG = 255, bgB = 255;
  let bgA = 255;
  if (dSquircle > -aa) {
    const edgeAlpha = Math.min(1, Math.max(0, -dSquircle / aa + 0.5));
    bgA = Math.round(255 * edgeAlpha);
  }

  // 3 rising bars aligned at the bottom (y = 0.79):
  // Bar 1 (Left / Shortest: Navy #101828)
  const d1 = sdBar(u, v, 0.285, 0.39, 0.060, 0.225, 0.120, 0.46, 0.33);
  // Bar 2 (Middle / Medium: Deep Navy #0D2240)
  const d2 = sdBar(u, v, 0.500, 0.31, 0.068, 0.435, 0.130, 0.39, 0.40);
  // Bar 3 (Right / Tallest: Signature Emerald Green #21C87A)
  const d3 = sdBar(u, v, 0.715, 0.23, 0.076, 0.642, 0.146, 0.32, 0.47);

  let r = bgR, g = bgG, b = bgB, a = bgA;

  // Render Bar 1 (Shortest / Brand Dark Navy #101828)
  if (d1 < aa) {
    const alpha = Math.min(1, Math.max(0, -d1 / aa + 0.5));
    const barR = 16, barG = 24, barB = 40; // #101828
    r = Math.round(barR * alpha + r * (1 - alpha));
    g = Math.round(barG * alpha + g * (1 - alpha));
    b = Math.round(barB * alpha + b * (1 - alpha));
  }

  // Render Bar 2 (Middle / Deep Tech Navy #0D2240)
  if (d2 < aa) {
    const alpha = Math.min(1, Math.max(0, -d2 / aa + 0.5));
    const barR = 13, barG = 34, barB = 64; // #0D2240
    r = Math.round(barR * alpha + r * (1 - alpha));
    g = Math.round(barG * alpha + g * (1 - alpha));
    b = Math.round(barB * alpha + b * (1 - alpha));
  }

  // Render Bar 3 (Tallest / Signature Emerald Green #21C87A)
  if (d3 < aa) {
    const alpha = Math.min(1, Math.max(0, -d3 / aa + 0.5));
    const barR = 33, barG = 200, barB = 122; // #21C87A
    r = Math.round(barR * alpha + r * (1 - alpha));
    g = Math.round(barG * alpha + g * (1 - alpha));
    b = Math.round(barB * alpha + b * (1 - alpha));
  }

  return [r, g, b, a];
}

// Generate ICO file containing multiple PNG images
function createICO(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map(p => p.buffer)
  ]);
}

// 1. Generate PNGs
console.log('Generating favicon assets...');
const sizes = [16, 32, 48, 96, 180, 192, 512];
const generated = {};

for (const s of sizes) {
  const pngBuf = createPNG(s, s, drawShaghalLogo);
  generated[s] = pngBuf;
}

fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), generated[48]);
fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), generated[96]);
fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), generated[192]);
fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), generated[512]);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generated[180]);

// 2. Generate ICO (16, 32, 48)
const icoBuf = createICO([
  { width: 16, height: 16, buffer: generated[16] },
  { width: 32, height: 32, buffer: generated[32] },
  { width: 48, height: 48, buffer: generated[48] }
]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

console.log('All favicon PNGs and favicon.ico generated successfully!');
