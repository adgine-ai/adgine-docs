---
title: WordPress 集成
sidebar_position: 4
description: 将 Adgine 生成的内容发布到 WordPress 站点。
---

# WordPress 集成

连接 WordPress 站点，将 Adgine 中创作的内容一键发布到您的 WordPress 博客。

## 适用场景

- 将 GEO 优化内容发布到现有 WordPress 站点
- 自动同步分类与标签
- 管理发布历史

## 操作步骤

### 配置 WordPress 凭证

1. 进入 **管理 → 集成**
2. 找到 **WordPress**，点击 **配置**
3. 填写以下信息：
   - **站点 URL** — WordPress 站点地址（如 `https://blog.example.com`）
   - **用户名** — WordPress 管理员用户名
   - **应用密码** — WordPress 应用密码（非登录密码）
4. 点击 **测试连接** 验证
5. 保存配置

:::info 如何获取应用密码？
在 WordPress 后台 → 用户 → 个人资料 → 应用密码，创建新的应用密码。
:::

### 发布内容

1. 在内容编辑器中完成文章编辑
2. 点击 **发布** → 选择 **WordPress**
3. 选择目标分类
4. 确认发布

### 查看发布记录

在集成页面或内容详情中查看发布状态与 WordPress 文章链接。

### 断开连接

在集成页面清除 WordPress 凭证即可。

## 常见问题

### 连接测试失败？

- 确认站点 URL 可访问且安装了 WordPress REST API
- 确认使用的是**应用密码**而非登录密码
- 检查 WordPress 是否启用了 HTTPS

### 支持哪些 WordPress 版本？

支持 WordPress 5.6+ 且启用了应用密码功能。

### 可以发布到多个 WordPress 站点吗？

每个项目配置一个 WordPress 站点。多站点需创建多个项目。

---

**相关文档**：[内容创作](/features/content) · [集成总览](/features/integrations/overview)
