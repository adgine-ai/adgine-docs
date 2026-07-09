---
title: Cloudflare 集成
sidebar_position: 3
description: 部署 Cloudflare Worker 监控 AI Bot 流量。
---

# Cloudflare 集成

通过 Cloudflare 集成，部署 Worker 监控 AI Bot 访问流量，是 GEO 流量分析的核心数据源。

## 适用场景

- 监控 GPTBot、PerplexityBot 等 AI 爬虫访问
- 在 Dashboard 和爬虫模块查看 Bot 流量
- 自动部署 GEO 监控 Worker

## 操作步骤

### 连接 Cloudflare

1. 进入 **管理 → 集成**
2. 找到 **Cloudflare**，点击 **连接**
3. 完成 Cloudflare OAuth 授权
4. 选择要监控的 Zone（域名）

### 部署 Worker

1. 连接成功后，点击 **部署 Worker**
2. 系统自动生成并部署监控 Worker 到您的 Zone
3. 部署完成后，Bot 流量数据开始采集

### 查看 Bot 流量

部署成功后，在以下位置查看数据：

- **Dashboard** — Cloudflare Worker 流量卡片
- **数据 → 爬虫** — Bot 流量详细分析

### 断开连接

1. 在集成页面断开 Cloudflare 连接
2. 建议同时手动删除已部署的 Worker（在 Cloudflare Dashboard 中）

## 工作原理

```
用户访问网站 → Cloudflare Worker 拦截 → 识别 Bot/User-Agent → 上报到 Adgine API → 展示在平台
```

Worker 会识别常见 AI Bot 的 User-Agent，包括：

- GPTBot（OpenAI）
- PerplexityBot
- Google-Extended
- 等

## 常见问题

### Worker 部署失败？

确认 Cloudflare 账户对该 Zone 有 Worker 部署权限，且 Zone 处于 Active 状态。

### 会影响网站性能吗？

Worker 运行在 Cloudflare 边缘节点，延迟极低，对正常访问几乎无影响。

### 可以监控多个域名吗？

每个项目关联一个主域名。多域名需要在对应 Zone 分别部署。

---

**相关文档**：[集成总览](/features/integrations/overview) · [爬虫与流量](/features/crawler)
