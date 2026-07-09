---
title: 集成总览
sidebar_position: 1
description: Adgine 支持的第三方集成概览。
---

# 第三方集成总览

Adgine 支持多种第三方服务集成，帮助您连接数据源、部署监控、发布内容。

## 支持的集成

| 集成 | 用途 | 文档 |
|------|------|------|
| **Google Analytics 4** | 人类流量分析、转化追踪 | [GA4 集成](/features/integrations/ga4) |
| **Cloudflare** | Bot 流量监控、Worker 部署、域名管理 | [Cloudflare 集成](/features/integrations/cloudflare) |
| **WordPress** | 内容发布到 WordPress 站点 | [WordPress 集成](/features/integrations/wordpress) |
| **Adgine CMS** | 内容发布到 Adgine 内容管理系统 | [Adgine CMS 集成](/features/integrations/adgine-cms) |
| **Vercel** | 部署日志与 AI Agent 分析 | [Vercel 集成](/features/integrations/vercel) |

## 通用操作

### 进入集成页面

1. 进入 **管理 → 集成**（`/geo/integration`）
2. 查看所有可用集成及其连接状态

### 连接集成

1. 点击目标集成的 **连接** 按钮
2. 按提示完成 OAuth 授权或填写凭证
3. 连接成功后状态变为「已连接」

### 断开集成

1. 在集成详情页点击 **断开连接**
2. 确认后清除存储的凭证
3. 历史同步数据保留，但不再更新

:::warning 安全说明
所有 OAuth Token 均加密存储。断开集成后，平台不再访问您的第三方账户。
:::

## 集成与功能的关系

```
GA4 ──────────→ Dashboard 流量图表、爬虫人类流量
Cloudflare ───→ Bot 流量监控、Worker 部署
WordPress ────→ 内容发布
Adgine CMS ───→ 内容发布（ACPP 协议）
Vercel ───────→ 部署日志、页面健康分析
```

## 常见问题

### 可以同时连接多个集成吗？

可以。各集成独立工作，互不影响。

### 集成失败怎么办？

检查第三方账户权限是否足够，网络是否正常。各集成文档中有详细的故障排查步骤。

---

**相关文档**：各集成子页面 · [Dashboard 总览](/features/dashboard)
