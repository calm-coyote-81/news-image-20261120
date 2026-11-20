// Render poster.html to a 1024x1024 PNG with the machine's headless Chromium.
// Usage: node render.mjs [output.png]   (default: entry.png beside this file)
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? join(dir, 'entry.png');
const chrome = join(
  homedir(),
  '.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell',
);
if (!existsSync(chrome)) {
  console.error('headless chromium not found at', chrome);
  process.exit(1);
}
const page = join(dir, 'poster.html');
execFileSync(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1024,1024',
    `--screenshot=${out}`,
    `file://${page}`,
  ],
  { stdio: 'inherit' },
);
console.log('wrote', out, statSync(out).size, 'bytes');
