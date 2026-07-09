#!/usr/bin/env node
/**
 * Basic link checker for built static site.
 * Usage: npm run build && node scripts/check-links.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '../build');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const htmlFiles = walk(BUILD_DIR);
  const hrefPattern = /href="(\/docs\/[^"#?]+)"/g;
  const missing = [];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = hrefPattern.exec(content)) !== null) {
      const href = match[1].replace(/\/$/, '');
      const candidates = [
        path.join(BUILD_DIR, href.replace(/^\/docs\//, '') + '.html'),
        path.join(BUILD_DIR, href.replace(/^\/docs\//, ''), 'index.html'),
      ];
      if (!candidates.some((c) => fs.existsSync(c))) {
        missing.push({from: path.relative(BUILD_DIR, file), href});
      }
    }
  }

  if (missing.length) {
    console.error(`Found ${missing.length} potentially broken internal link(s):`);
    for (const m of missing.slice(0, 20)) {
      console.error(`  ${m.from} -> ${m.href}`);
    }
    process.exit(1);
  }

  console.log(`Checked ${htmlFiles.length} HTML file(s). No broken /docs/ links found.`);
}

main();
