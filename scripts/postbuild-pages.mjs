#!/usr/bin/env node
/**
 * Cloudflare Pages serves the build/ folder at the domain root.
 * Docusaurus with baseUrl=/docs/ emits assets at build/assets/ but HTML
 * references /docs/assets/ — so we nest the whole site under build/docs/.
 *
 * Also merges per-locale sitemaps into a single build/docs/sitemap.xml
 * (main site robots.txt only references that one URL).
 *
 * Usage: npm run build && node scripts/postbuild-pages.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BUILD = path.join(ROOT, 'build');
const STAGING = path.join(ROOT, 'build-pages-staging');
const DOCS_DIR = path.join(BUILD, 'docs');
const MERGED_SITEMAP = path.join(DOCS_DIR, 'sitemap.xml');
const LOCALE_SITEMAPS = [
  path.join(DOCS_DIR, 'sitemap.xml'),
  path.join(DOCS_DIR, 'en', 'sitemap.xml'),
  path.join(DOCS_DIR, 'zh-TW', 'sitemap.xml'),
];

function rmrf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, {recursive: true, force: true});
  }
}

/** Extract <url>...</url> blocks from a sitemap urlset. */
function extractUrlBlocks(xml) {
  return xml.match(/<url\b[\s\S]*?<\/url>/g) ?? [];
}

function locFromUrlBlock(block) {
  const match = block.match(/<loc>([^<]*)<\/loc>/);
  return match ? match[1].trim() : null;
}

/**
 * Merge Docusaurus per-locale sitemaps into one urlset at docs/sitemap.xml,
 * then remove locale-specific sitemap files so there is a single public entry.
 */
function mergeSitemaps() {
  const seen = new Set();
  const blocks = [];

  for (const file of LOCALE_SITEMAPS) {
    if (!fs.existsSync(file)) {
      console.warn(`Post-build: sitemap missing, skipped: ${path.relative(ROOT, file)}`);
      continue;
    }
    const xml = fs.readFileSync(file, 'utf8');
    for (const block of extractUrlBlocks(xml)) {
      const loc = locFromUrlBlock(block);
      if (!loc || seen.has(loc)) {
        continue;
      }
      seen.add(loc);
      blocks.push(block);
    }
  }

  if (blocks.length === 0) {
    console.error('FATAL: no sitemap URL entries found to merge.');
    process.exit(1);
  }

  const merged = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${blocks.map((b) => `\n${b}`).join('')}
</urlset>
`;
  fs.writeFileSync(MERGED_SITEMAP, merged, 'utf8');

  for (const file of LOCALE_SITEMAPS) {
    if (file === MERGED_SITEMAP || !fs.existsSync(file)) {
      continue;
    }
    fs.unlinkSync(file);
  }

  console.log(
    `Post-build: merged ${blocks.length} URLs into docs/sitemap.xml (single sitemap).`,
  );
}

function main() {
  if (!fs.existsSync(BUILD)) {
    console.error('build/ not found. Run npm run build first.');
    process.exit(1);
  }

  rmrf(STAGING);
  fs.mkdirSync(path.join(STAGING, 'docs'), {recursive: true});

  for (const entry of fs.readdirSync(BUILD)) {
    fs.renameSync(path.join(BUILD, entry), path.join(STAGING, 'docs', entry));
  }

  fs.writeFileSync(
    path.join(STAGING, '_redirects'),
    fs.readFileSync(path.join(ROOT, 'static', '_redirects'), 'utf8'),
    'utf8',
  );

  const redirectHtml = `<!DOCTYPE html>
<html lang="zh-Hans">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=/docs/" />
    <link rel="canonical" href="/docs/" />
    <title>Adgine Docs</title>
    <script>window.location.replace('/docs/');</script>
  </head>
  <body>
    <p><a href="/docs/">Adgine Docs</a></p>
  </body>
</html>
`;
  fs.writeFileSync(path.join(STAGING, 'index.html'), redirectHtml, 'utf8');

  rmrf(BUILD);
  fs.renameSync(STAGING, BUILD);

  const nestedRedirects = path.join(BUILD, 'docs', '_redirects');
  if (fs.existsSync(nestedRedirects)) {
    fs.unlinkSync(nestedRedirects);
  }

  const assetsDir = path.join(BUILD, 'docs', 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('FATAL: build/docs/assets missing after postbuild.');
    process.exit(1);
  }

  mergeSitemaps();

  console.log('Post-build: nested site at build/docs/ for Cloudflare Pages.');
}

main();
