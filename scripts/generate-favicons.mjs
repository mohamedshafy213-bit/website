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

// Distance to rounded rectangle
function distToRoundedRect(px, py, rx, ry, rw, rh, rad) {
  const cx = rx + rw / 2;
  const cy = ry + rh / 2;
  const dx = Math.abs(px - cx) - (rw / 2 - rad);
  const dy = Math.abs(py - cy) - (rh / 2 - rad);
  if (dx <= 0 && dy <= 0) return -Math.max(-dx, -dy);
  const ox = Math.max(0, dx);
  const oy = Math.max(0, dy);
  return Math.sqrt(ox * ox + oy * oy);
}

// Distance to circle
function distToCircle(px, py, cx, cy, r) {
  const dx = px - cx;
  const dy = py - cy;
  return Math.sqrt(dx * dx + dy * dy) - r;
}

// Draw the Shaghal Logo onto icon canvas
function drawShaghalLogo(u, v, px, py, width, height) {
  // Background: Sleek dark squircle (#101828 to #0D1526)
  const pad = width * 0.04;
  const squircleRad = width * 0.22;
  const dSquircle = distToRoundedRect(px, py, pad, pad, width - 2 * pad, height - 2 * pad, squircleRad);

  if (dSquircle > 0) {
    return [0, 0, 0, 0]; // Transparent outside
  }

  // Base background gradient: Navy Dark
  // Subtle emerald border
  let bgR = 16, bgG = 24, bgB = 40, bgA = 255;
  if (dSquircle > -width * 0.03) {
    // Border edge
    const borderBlend = (-dSquircle) / (width * 0.03);
    bgR = Math.round(33 * (1 - borderBlend) + bgR * borderBlend);
    bgG = Math.round(200 * (1 - borderBlend) + bgG * borderBlend);
    bgB = Math.round(122 * (1 - borderBlend) + bgB * borderBlend);
  }

  // Logo geometric bounds in normalized coordinates (0..1)
  // 3 rising bars:
  // Bar 1 (Left / Cyan): cx = 0.30, cy_circle = 0.36, r = 0.055, rect: x=0.245, w=0.11, y=0.43, h=0.34
  // Bar 2 (Middle / Deep Blue-Cyan): cx = 0.50, cy_circle = 0.28, r = 0.062, rect: x=0.435, w=0.13, y=0.36, h=0.41
  // Bar 3 (Right / Vibrant Emerald): cx = 0.72, cy_circle = 0.20, r = 0.070, rect: x=0.645, w=0.15, y=0.29, h=0.48

  // Helper for pill / bar distance
  function dBar(barCx, circleCy, circleR, barX, barW, barY, barH) {
    const dCirc = distToCircle(u, v, barCx, circleCy, circleR);
    const dRec = distToRoundedRect(u, v, barX, barY, barW, barH, barW / 2);
    return Math.min(dCirc, dRec);
  }

  // Bar 1
  const d1 = dBar(0.29, 0.38, 0.056, 0.234, 0.112, 0.45, 0.32);
  // Bar 2
  const d2 = dBar(0.50, 0.30, 0.064, 0.435, 0.130, 0.38, 0.39);
  // Bar 3 (Emerald)
  const d3 = dBar(0.72, 0.21, 0.072, 0.645, 0.150, 0.30, 0.47);

  // Anti-aliasing width in normalized units
  const aa = 1.2 / width;

  let r = bgR, g = bgG, b = bgB, a = bgA;

  // Render Bar 1 (Electric Blue / Cyan)
  if (d1 < aa) {
    const alpha = Math.min(1, Math.max(0, (aa - d1) / (2 * aa)));
    const barR = 56, barG = 189, barB = 248; // #38BDF8
    r = Math.round(barR * alpha + r * (1 - alpha));
    g = Math.round(barG * alpha + g * (1 - alpha));
    b = Math.round(barB * alpha + b * (1 - alpha));
  }

  // Render Bar 2 (Deep Tech Cyan / Light Navy)
  if (d2 < aa) {
    const alpha = Math.min(1, Math.max(0, (aa - d2) / (2 * aa)));
    const barR = 14, barG = 165, barB = 233; // #0EA5E9
    r = Math.round(barR * alpha + r * (1 - alpha));
    g = Math.round(barG * alpha + g * (1 - alpha));
    b = Math.round(barB * alpha + b * (1 - alpha));
  }

  // Render Bar 3 (Signature Emerald #21C87A)
  if (d3 < aa) {
    const alpha = Math.min(1, Math.max(0, (aa - d3) / (2 * aa)));
    const barR = 33, barG = 200, barB = 122; // #21C87A
    r = Math.round(barR * alpha + r * (1 - alpha));
    g = Math.round(barG * alpha + g * (1 - alpha));
    b = Math.round(barB * alpha + b * (1 - alpha));
  }

  return [r, g, b, 255];
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
