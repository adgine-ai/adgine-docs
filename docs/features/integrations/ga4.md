---
title: GA4 集成
sidebar_position: 2
description: 连接 Google Analytics 4 获取流量数据。
---

# GA4 集成

连接 Google Analytics 4（GA4），在 Adgine 中查看网站的人类访问流量与转化数据。

## 适用场景

- 在 Dashboard 中展示 GA4 流量趋势
- 在爬虫模块中对比人类流量与 Bot 流量
- 为机会分析提供流量数据支撑

## 操作步骤

### 连接 GA4

1. 进入 **管理 → 集成**（`/geo/integration`）
2. 找到 **Google Analytics 4**，点击 **连接**
3. 跳转 Google OAuth 授权页面
4. 选择要关联的 GA4 属性
5. 授权成功后自动返回平台

### 查看 GA4 数据

连接成功后，数据将出现在：

- **Dashboard** — GA4 流量趋势图
- **数据 → 爬虫 → GA4** Tab — 详细报表
- **数据 → 爬虫 → 人类流量** Tab — 人类访问分析

### 断开连接

1. 在集成页面找到 GA4
2. 点击 **断开连接**
3. 确认操作

## 数据同步说明

- **实时查询**：前端展示时直接从 GA4 API 获取最新数据
- **定时同步**：后台定期同步历史数据，用于趋势分析

## 常见问题

### 授权后看不到数据？

确认 GA4 属性中有足够的访问数据，且时间范围内有流量记录。

### 需要哪些 Google 权限？

需要 Google Analytics 只读权限。平台不会修改您的 GA4 配置。

### 支持 Universal Analytics 吗？

仅支持 GA4。Universal Analytics 已于 2023 年停止服务。

---

**相关文档**：[集成总览](/features/integrations/overview) · [爬虫与流量](/features/crawler)
