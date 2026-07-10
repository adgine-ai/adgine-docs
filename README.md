# Adgine 文档站

Adgine GEO 平台产品使用手册，基于 [Docusaurus 3](https://docusaurus.io/) 构建。

- **仓库**：[github.com/adgine-ai/adgine-docs](https://github.com/adgine-ai/adgine-docs)

- **生产地址**：https://adgine.ai/docs
- **部署**：Cloudflare Pages（免费版）+ adgine.ai Nginx 反代
- **语言**：简体中文（默认）、繁体中文、English

## 快速开始

```bash
npm ci
npm start          # 本地开发 http://localhost:3000/docs/
npm run build      # 生产构建
npm run serve      # 预览构建产物
```

## 目录结构

```
docs/                 # 简体中文文档（默认语言）
i18n/en/              # 英文翻译
i18n/zh-TW/           # 繁体中文翻译
scripts/              # 内容生成与链接检查脚本
deploy/               # Nginx 与 Cloudflare Pages 部署说明
```

## 编辑文档

### 运营后台（推荐）

使用 **Decap CMS** 可视化编辑，支持拖拽上传截图：

- 后台地址：https://adgine.ai/docs/admin/
- 搭建指南：[deploy/decap-cms-setup.md](deploy/decap-cms-setup.md)
- 运营手册：[deploy/ops-editor-guide.md](deploy/ops-editor-guide.md)

### 开发者 / Git 直编

1. 修改 `docs/` 下对应 `.md` 文件
2. 提交 PR，Cloudflare Pages 自动生成预览
3. 合并 `main` 后自动发布

### 半自动生成草稿

从 GEO-Api / GEO-Dashboard 提取技术文档要点，生成待审核草稿：

```bash
npm run generate-docs
# 输出到 scripts/generated/
```

需设置源仓库路径（默认 `../GEO-Api` 与 `../GEO-Dashboard`）：

```bash
GEO_API_ROOT=/path/to/GEO-Api GEO_WEB_ROOT=/path/to/GEO-Dashboard npm run generate-docs
```

## 多语言

```bash
npm run build -- --locale en
npm run build -- --locale zh-TW
npm run write-translations   # 提取待翻译 UI 字符串
```

## 部署

详见 [deploy/cloudflare-pages.md](deploy/cloudflare-pages.md)、[deploy/nginx-adgine-docs.conf](deploy/nginx-adgine-docs.conf) 与 [deploy/decap-cms-setup.md](deploy/decap-cms-setup.md)。

## 维护 checklist

- 每个 GEO-Dashboard 功能 PR 应同步文档 PR
- 发版后更新 `docs/appendix/changelog.md`
- 产品 UI 大改时重新截图（`scripts/screenshot.mjs`，Phase 2）
