---
id: crawler
title: 爬虫与流量监控
sidebar_position: 6
description: 监控 AI Bot 与人类访问流量。
---

# 爬虫与流量监控

爬虫与流量监控帮助您了解网站的 AI Bot 访问情况和真实用户流量，评估 GEO 优化的实际影响。

## 适用场景

- 确认 AI 爬虫是否正常访问您的网站
- 对比 Bot 流量与人类流量趋势
- 分析页面级别的访问健康度

## 功能模块

进入 **数据 → 爬虫**（`/geo/crawler`），包含以下 Tab：

| Tab | 说明 |
|-----|------|
| **概览** | Bot 与人类流量总览、关键 KPI |
| **Bot 流量** | AI 爬虫访问详情（按 Bot 类型、页面） |
| **人类流量** | 真实用户访问数据（需 GA4 集成） |
| **GA4** | Google Analytics 4 报表 |
| **页面** | 页面级别健康度与性能 |
| **日志** | 访问日志查询 |

## 操作步骤

### 查看流量概览

1. 进入爬虫页面
2. 查看 Bot 与人类流量的对比趋势
3. 关注 AI Bot 访问频率变化

### 分析 Bot 流量

1. 切换到 **Bot 流量** Tab
2. 按 Bot 类型筛选（如 GPTBot、PerplexityBot 等）
3. 查看各页面的 Bot 访问次数

### 查看页面健康度

1. 切换到 **页面** Tab
2. 查看页面加载性能、索引状态
3. 识别需要优化的页面

:::info 前置条件
Bot 流量数据需要部署 [Cloudflare Worker 集成](/features/integrations/cloudflare)。人类流量需要 [GA4 集成](/features/integrations/ga4)。
:::

## 常见问题

### 为什么看不到 Bot 流量？

请确认已部署 Cloudflare Worker 且集成状态正常。参见 Cloudflare 集成文档。

### GA4 数据与 Bot 数据有什么区别？

GA4 追踪人类用户行为；Bot 流量追踪 AI 爬虫访问。两者互补，共同反映 GEO 效果。

---

**相关文档**：[Cloudflare 集成](/features/integrations/cloudflare) · [GA4 集成](/features/integrations/ga4) · [Dashboard 总览](/features/dashboard)
