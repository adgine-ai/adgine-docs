---
title: Vercel 集成
sidebar_position: 6
description: 连接 Vercel 获取部署日志与页面分析。
---

# Vercel 集成

连接 Vercel 项目，获取部署日志与页面健康分析数据。

## 适用场景

- 监控 Vercel 部署站点的访问日志
- 分析页面性能与健康度
- 配合 AI Agent 模块进行深度分析

## 操作步骤

### 连接 Vercel

1. 进入 **管理 → 集成**
2. 找到 **Vercel**，点击 **连接**
3. 完成 Vercel OAuth 授权
4. 选择要关联的项目

### 配置 Log Drain

1. 连接成功后，系统引导配置 Log Drain
2. Log Drain 将 Vercel 访问日志转发到 Adgine
3. 配置完成后开始接收日志数据

### 查看数据

- **数据 → 爬虫 → 日志** Tab — 查看 Vercel 访问日志
- **数据 → 爬虫 → 页面** Tab — 页面健康度分析

### 断开连接

在集成页面断开 Vercel 连接，并建议在 Vercel 控制台移除 Log Drain 配置。

## 常见问题

### Log Drain 配置失败？

确认 Vercel 账户有项目管理员权限，且项目处于活跃状态。

### 与 Cloudflare 集成冲突吗？

不冲突。Cloudflare 监控 Bot 流量，Vercel 提供部署日志，两者互补。

---

**相关文档**：[集成总览](/features/integrations/overview) · [爬虫与流量](/features/crawler)
