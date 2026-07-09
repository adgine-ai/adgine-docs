# Cloudflare Pages 部署说明

## 免费版额度

Cloudflare Pages 免费账户包含：

- 无限站点、带宽与请求
- 500 次构建/月
- 1 个并发构建

对文档站完全够用。

## 配置步骤

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. 选择 **Pages** → **Connect to Git**
3. 授权 GitHub，选择 `Adgine-Docs` 仓库
4. 构建设置：

| 设置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `build` |
| Node version | `24` |

在 **Settings → Environment variables** 中添加（生产 + 预览环境都设）：

| 变量名 | 值 |
|--------|-----|
| `NODE_VERSION` | `24` |

5. 保存并部署。首次构建完成后获得 `*.pages.dev` 预览域名。

## 自定义域名（可选）

在 Pages 项目 → **Custom domains** 中添加 `docs-static.adgine.ai`，然后在 `adgine.ai` Nginx 中反代到该域名或 `*.pages.dev`。

## PR 预览

每个 Pull Request 自动触发预览部署，URL 格式：`https://<commit-hash>.adgine-docs.pages.dev/docs/`

## 切换到自托管

若需切换到 platform.adgine.ai 服务器：

```bash
npm ci
npm run build
rsync -avz build/ user@server:/var/www/adgine-docs/
```

然后修改 Nginx 配置，使用 `deploy/nginx-adgine-docs.conf` 中的 Option B。
