#!/usr/bin/env node
/**
 * Basic link checker for built static site (after postbuild-pages).
 * Usage: npm run build:pages && node scripts/check-links.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '../build');
const SITE_ROOT = fs.existsSync(path.join(BUILD_DIR, 'docs'))
  ? path.join(BUILD_DIR, 'docs')
  : BUILD_DIR;

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
    console.error('Build directory not found. Run npm run build:pages first.');
    process.exit(1);
  }

  const htmlFiles = walk(SITE_ROOT);
  const hrefPattern = /href="(\/docs\/[^"#?]+)"/g;
  const missing = [];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = hrefPattern.exec(content)) !== null) {
      const href = match[1].replace(/\/$/, '');
      const relative = href.replace(/^\/docs\//, '');
      const candidates = [
        path.join(SITE_ROOT, relative + '.html'),
        path.join(SITE_ROOT, relative, 'index.html'),
      ];
      if (!candidates.some((c) => fs.existsSync(c))) {
        missing.push({from: path.relative(SITE_ROOT, file), href});
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

  console.log(
    `Checked ${htmlFiles.length} HTML file(s) under ${path.relative(BUILD_DIR, SITE_ROOT) || '.'}. No broken /docs/ links found.`,
  );
}

main();
