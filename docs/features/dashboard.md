---
id: dashboard
title: Dashboard 总览
sidebar_position: 7
description: 了解 Dashboard 总览页面与各快捷入口。
---

# Dashboard 总览

Dashboard 是登录后的默认首页，提供项目核心指标的一站式概览。

## 适用场景

- 每日快速了解项目整体表现
- 通过快捷入口跳转到各功能模块
- 监控关键 KPI 变化

## 页面组成

进入 **Dashboard**（`/dashboard`），您将看到：

### 核心指标卡片

- **可见性得分** — 品牌在 AI 平台的综合表现
- **引用次数** — 近期被 AI 引用的频率
- **内容数量** — 已创建与已发布的内容统计
- **积分余额** — 当前可用积分

### 数据图表

- **GA4 流量趋势** — 需连接 GA4 集成
- **Cloudflare Worker 流量** — 需部署 Worker
- **AI Agent KPI** — Bot 与人类流量对比
- **平台排行榜** — 各 AI 平台表现排名

### 快捷入口

| 入口 | 跳转 |
|------|------|
| 品牌中心 | 管理品牌认知 |
| 主题管理 | 管理主题与提示词 |
| 创建内容 | 开始内容创作 |
| 可见性分析 | 查看详细分析 |
| 集成设置 | 配置第三方连接 |

## 操作步骤

### 切换时间范围

使用页面顶部的时间筛选器，查看不同时间段的数据。

### 使用 AI Copilot

Dashboard 右侧的 **AI Copilot** 助手可：

- 解读当前数据表现
- 建议优化优先级
- 回答关于平台功能的问题

### 切换项目

点击顶部 **切换项目**，选择其他项目查看对应的 Dashboard 数据。

## 常见问题

### Dashboard 数据为空？

请确认已完成品牌初始化，并连接至少一项数据源（GA4 或 Cloudflare）。

### 如何自定义 Dashboard？

目前 Dashboard 布局为固定模板。后续版本将支持更多自定义选项。

---

**相关文档**：[可见性分析](/features/analytics) · [爬虫与流量](/features/crawler) · [集成总览](/features/integrations/overview)
