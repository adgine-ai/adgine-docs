---
id: api-keys
title: API Key 使用
sidebar_position: 9
description: 创建和管理 API Key，供外部平台与 Adgine Skills 使用。
---

# API Key 使用

API Key 允许您在 Adgine 平台外部（如 OpenClaw、Hermes Agent 等）通过 API 或 Skills 访问 Adgine 功能。

## 适用场景

- 在 AI Agent 平台中使用 Adgine Skills
- 通过 API 自动化品牌分析、内容生成等操作
- 集成到自定义工作流

## 操作步骤

### 创建 API Key

1. 登录 [platform.adgine.ai](https://platform.adgine.ai)
2. 进入 **个人中心** → **API Key**
3. 点击 **创建 API Key**
4. 输入名称（如「OpenClaw 集成」）
5. 复制生成的 Key（格式：`geo_sk_live_*`）

:::warning 安全提示
API Key 仅在创建时显示一次。请立即复制并安全保存。若遗失，需删除后重新创建。
:::

### 在 Skills 中使用

将 API Key 配置到 Adgine Skills 环境：

```bash
# 在 skills 根目录的 .env 文件中
GEO_API_KEY=geo_sk_live_your_key_here
```

或在 Agent 平台的环境变量中设置 `GEO_API_KEY`。

### 管理 API Key

在个人中心 → API Key 页面：

- 查看所有已创建的 Key 及其最后使用时间
- 删除不再使用的 Key
- 每个 Key 可独立命名，便于管理

## 可用 Skills

配置 API Key 后，可使用以下 Skills：

| Skill | 功能 |
|-------|------|
| adgine/geo-brand | 品牌认知生成与管理 |
| adgine/geo-topics | 主题与提示词管理 |
| adgine/geo-content | 内容创作与管理 |
| adgine/geo-visibility | 可见性分析 |
| adgine/geo-integrations | 第三方集成 |
| adgine/geo-billing | 订阅与积分查询 |
| 更多... | 参见 Skills 文档 |

## 常见问题

### API Key 与登录 Token 有什么区别？

登录 Token（JWT）用于前端 Web 会话；API Key 用于程序化 API 访问，长期有效直到手动删除。

### API Key 有权限限制吗？

API Key 继承创建者的账户权限，可访问该账户下所有项目的 API。

### 如何保护 API Key？

- 不要提交到 Git 仓库
- 使用环境变量存储
- 定期轮换不再使用的 Key

---

**相关文档**：[新用户向导](/getting-started/onboarding-wizard) · [订阅与积分](/features/billing)
