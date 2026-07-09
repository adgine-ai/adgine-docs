---
title: Adgine CMS 集成
sidebar_position: 5
description: 通过 ACPP 协议将内容发布到 Adgine CMS。
---

# Adgine CMS 集成

通过 Adgine 内容发布协议（ACPP），将 GEO 生成的文章发布到 Adgine CMS 托管的网站。

## 适用场景

- 使用 Adgine 子域名站点（`*.adgine.net`）发布内容
- 通过 ACPP 协议对接自建 Adgine CMS
- 统一管理内容发布与目录结构

## 操作步骤

### 配置 Adgine CMS 凭证

1. 进入 **管理 → 集成**
2. 找到 **Adgine CMS**，点击 **配置**
3. 填写：
   - **发布 URL** — Adgine CMS 的发布端点
   - **Access Token** — CMS 访问令牌
4. 点击 **测试连接**
5. 保存配置

### 同步目录结构

1. 配置完成后，点击 **同步目录**
2. 系统拉取 CMS 中的分类/目录结构
3. 发布时可选择目标目录

### 发布内容

1. 在内容编辑器中点击 **发布** → 选择 **Adgine CMS**
2. 选择目标目录
3. 确认发布

### 查看发布记录

在集成页面查看历史发布记录，包含发布状态与 CMS 文章链接。

## ACPP 协议说明

ACPP（Adgine Content Publishing Protocol）是 Adgine 定义的内容发布协议：

- 基于 REST API
- 支持文章创建、更新与目录管理
- 使用 Access Token 认证

## 常见问题

### 与 WordPress 集成有什么区别？

Adgine CMS 集成面向 Adgine 自有 CMS 系统（含子域名站点），使用 ACPP 协议；WordPress 集成面向标准 WordPress 站点。

### 子域名站点需要手动配置吗？

通过「使用二级域名快速创建网站」创建的站点，集成通常自动配置。

---

**相关文档**：[内容创作](/features/content) · [集成总览](/features/integrations/overview)
