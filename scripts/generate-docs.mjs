#!/usr/bin/env node
/**
 * Semi-automatic doc generator for Adgine user manual.
 * Reads technical sources from GEO-Api / GEO-Dashboard and emits
 * user-facing Markdown drafts under docs/.
 *
 * Usage: npm run generate-docs
 * Env:
 *   GEO_API_ROOT   default ../GEO-Api
 *   GEO_WEB_ROOT   default ../GEO-Dashboard
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GEO_API_ROOT = process.env.GEO_API_ROOT || path.resolve(ROOT, '../GEO-Api');
const GEO_WEB_ROOT = process.env.GEO_WEB_ROOT || path.resolve(ROOT, '../GEO-Dashboard');

const ROUTE_MAP = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'sources/route-map.json'), 'utf8'),
);

const TECH_PATTERNS = [
  /^#{1,6}\s*.+\u6280\u672f\u603b\u7ed3.*/gm,
  /`src\/geo\/[^`]+`/g,
  /POST \/api\/[^\s]+/g,
  /GET \/api\/[^\s]+/g,
  /\b(Router|Service|Client|ORM|SQLAlchemy|FastAPI|Pydantic)\b/g,
  /```[\s\S]*?```/g,
];

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function stripTechnicalContent(markdown) {
  let text = markdown;
  for (const pattern of TECH_PATTERNS) {
    text = text.replace(pattern, '');
  }
  return text
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractBullets(markdown, max = 8) {
  return markdown
    .split('\n')
    .filter((line) => /^[-*]\s/.test(line.trim()))
    .slice(0, max)
    .map((line) => line.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean);
}

function loadSummarySources(relativePaths = []) {
  return relativePaths
    .map((rel) => readIfExists(path.join(GEO_API_ROOT, rel)))
    .filter(Boolean)
    .join('\n\n');
}

function loadSkillSources(skillNames = []) {
  return skillNames
    .map((name) =>
      readIfExists(path.join(GEO_API_ROOT, 'adgine_geo_skills', name, 'SKILL.md')),
    )
    .filter(Boolean)
    .join('\n\n');
}

function loadGeoJson() {
  const geoJsonPath = path.join(
    GEO_WEB_ROOT,
    'apps/geo/src/locales/langs/zh-CN/geo.json',
  );
  if (!fs.existsSync(geoJsonPath)) return {};
  return JSON.parse(fs.readFileSync(geoJsonPath, 'utf8'));
}

function buildDraftSection(title, bullets) {
  if (!bullets.length) return '';
  return `## ${title}\n\n${bullets.map((b) => `- ${b}`).join('\n')}\n`;
}

function generateDraftForEntry(entry) {
  const summaryRaw = loadSummarySources(entry.summarySources);
  const skillRaw = loadSkillSources(entry.skillSources);
  const cleaned = stripTechnicalContent(`${summaryRaw}\n\n${skillRaw}`);
  const bullets = extractBullets(cleaned);

  const hints = [];
  if (entry.route) hints.push(`对应平台路由：\`${entry.route}\``);
  if (entry.summarySources?.length) {
    hints.push(`参考内部文档：${entry.summarySources.join(', ')}`);
  }

  return [
    `<!-- AUTO-GENERATED DRAFT for ${entry.docSlug} -->`,
    `<!-- Generated at ${new Date().toISOString()} -->`,
    `<!-- ${hints.join(' | ')} -->`,
    '',
    `# ${entry.title}`,
    '',
    '> 本文由 `scripts/generate-docs.mjs` 从技术文档半自动生成，发布前需人工审核。',
    '',
    buildDraftSection('从内部文档提取的要点', bullets),
    '## 待补充',
    '',
    '- [ ] 操作步骤（附截图）',
    '- [ ] 适用场景',
    '- [ ] 常见问题',
    '',
  ].join('\n');
}

function main() {
  const geo = loadGeoJson();
  const report = {
    generatedAt: new Date().toISOString(),
    geoApiRoot: GEO_API_ROOT,
    geoWebRoot: GEO_WEB_ROOT,
    geoApiExists: fs.existsSync(GEO_API_ROOT),
    geoWebExists: fs.existsSync(GEO_WEB_ROOT),
    projectCreateTitle: geo?.project?.createPage?.title || null,
    entries: [],
  };

  const outDir = path.join(ROOT, 'scripts', 'generated');
  fs.mkdirSync(outDir, {recursive: true});

  const seen = new Set();
  for (const entry of ROUTE_MAP) {
    if (seen.has(entry.docSlug)) continue;
    seen.add(entry.docSlug);

    const draft = generateDraftForEntry(entry);
    const outFile = path.join(outDir, `${entry.docSlug.replace(/\//g, '__')}.md`);
    fs.writeFileSync(outFile, draft, 'utf8');
    report.entries.push({docSlug: entry.docSlug, outFile: path.relative(ROOT, outFile)});
  }

  const reportPath = path.join(outDir, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`Generated ${report.entries.length} draft(s) in scripts/generated/`);
  console.log(`GEO-Api: ${report.geoApiExists ? 'found' : 'NOT FOUND'} (${GEO_API_ROOT})`);
  console.log(`GEO-Dashboard: ${report.geoWebExists ? 'found' : 'NOT FOUND'} (${GEO_WEB_ROOT})`);
  if (report.projectCreateTitle) {
    console.log(`UI title sample: ${report.projectCreateTitle}`);
  }
}

main();
