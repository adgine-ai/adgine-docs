#!/usr/bin/env node
/**
 * Cloudflare Pages serves the build/ folder at the domain root.
 * Docusaurus with baseUrl=/docs/ emits assets at build/assets/ but HTML
 * references /docs/assets/ — so we nest the whole site under build/docs/.
 *
 * Usage: npm run build && node scripts/postbuild-pages.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BUILD = path.join(ROOT, 'build');
const STAGING = path.join(ROOT, 'build-pages-staging');

function rmrf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, {recursive: true, force: true});
  }
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

  console.log('Post-build: nested site at build/docs/ for Cloudflare Pages.');
}

main();
