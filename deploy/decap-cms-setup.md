# Decap CMS 运营编辑后台 — 搭建与配置指南

面向 **管理员 / 开发** 的一次性搭建说明。运营人员日常操作见 [ops-editor-guide.md](./ops-editor-guide.md)。

---

## 一、方案概览

```
运营 → https://adgine.ai/docs/admin/
         ↓ Login with GitHub
       Cloudflare Worker（OAuth 代理，免费）
         ↓
       GitHub API（读写 adgine-docs 仓库）
         ↓ 保存 = 创建 PR
       Cloudflare Pages 构建预览
         ↓ 合并 PR
       https://adgine.ai/docs/ 上线
```

| 项目 | 费用 |
|------|------|
| Decap CMS | 免费 |
| GitHub OAuth App | 免费 |
| Cloudflare Worker | 免费（10 万次/天） |
| Cloudflare Pages | 免费（已在用） |

---

## 二、前置条件

- [ ] 文档站已部署：`https://adgine-docs.pages.dev/docs/` 可访问
- [ ] Nginx 已配置 `adgine.ai/docs/` 反代（见 [nginx-adgine-docs.conf](./nginx-adgine-docs.conf)）
- [ ] 仓库 `adgine-ai/adgine-docs` 中已包含 `static/admin/`（本仓库已提交）
- [ ] 你有 GitHub 组织管理员权限 + Cloudflare 账号

---

## 三、Step 1 — 创建 GitHub OAuth App

1. 打开 GitHub → **adgine-ai** 组织 → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
2. 填写：

| 字段 | 值 |
|------|-----|
| Application name | `Adgine Docs CMS` |
| Homepage URL | `https://adgine.ai/docs/admin/` |
| Authorization callback URL | `https://adgine-docs-oauth.<你的子域>.workers.dev/callback` |

> Callback URL 在 Step 2 部署 Worker 后确定。可先填 `http://localhost:8787/callback` 测试，再改。

3. 创建后记录 **Client ID**
4. 点击 **Generate a new client secret**，记录 **Client Secret**（只显示一次）

### OAuth App 权限说明

- Scope：`repo`（读写仓库内容、创建 PR）
- 只有被加入 `adgine-docs` 仓库且拥有 **Write** 权限的 GitHub 用户，授权后才能保存

---

## 四、Step 2 — 部署 Cloudflare OAuth Worker

Worker 代码在仓库 `workers/decap-oauth/`。

### 4.1 安装 Wrangler（一次性）

```bash
npm install -g wrangler
wrangler login
```

### 4.2 部署

```bash
cd workers/decap-oauth
wrangler deploy
```

记下输出的地址，例如：

```
https://adgine-docs-oauth.your-name.workers.dev
```

### 4.3 配置密钥

```bash
wrangler secret put GITHUB_CLIENT_ID
# 粘贴 Client ID

wrangler secret put GITHUB_CLIENT_SECRET
# 粘贴 Client Secret

# 可选：限制允许使用 OAuth 的来源
wrangler secret put ALLOWED_ORIGINS
# 输入： https://adgine.ai,https://adgine-docs.pages.dev
```

### 4.4 验证 Worker

浏览器访问：

```
https://adgine-docs-oauth.<你的子域>.workers.dev/auth
```

应跳转到 GitHub 授权页。

### 4.5 回改 GitHub OAuth App

将 OAuth App 的 **Authorization callback URL** 改为：

```
https://adgine-docs-oauth.<你的子域>.workers.dev/callback
```

---

## 五、Step 3 — 配置 Decap CMS

编辑 `static/admin/config.yml`，修改：

```yaml
backend:
  base_url: https://adgine-docs-oauth.<你的子域>.workers.dev
```

提交并合并到 `main`，等待 Cloudflare Pages 重新部署。

### 访问地址

| 环境 | URL |
|------|-----|
| 生产 | `https://adgine.ai/docs/admin/` |
| CF 预览 | `https://adgine-docs.pages.dev/docs/admin/` |

> `/docs/` 的 Nginx 反代会自动覆盖 `/docs/admin/`，无需额外配置。

---

## 六、Step 4 — GitHub 仓库权限与分支保护

### 6.1 添加运营人员

GitHub → `adgine-ai/adgine-docs` → **Settings** → **Collaborators and teams**

- 为运营创建 GitHub 账号（或加入组织）
- 赋予 **Write** 权限（不要给 Admin，除非对方负责基建）

### 6.2 开启分支保护（强烈推荐）

**Settings** → **Branches** → **Add branch protection rule** → `main`

建议勾选：

- [x] Require a pull request before merging
- [x] Require approvals（至少 1 人，产品或开发）
- [ ] Do not allow bypassing（可选，管理员也走 PR）

配合 Decap 的 `publish_mode: editorial_workflow`，运营点 **Save** 会创建草稿分支和 PR，**不会直接改生产**。

### 6.3 Decap 工作流状态

| 状态 | 含义 |
|------|------|
| Draft | 草稿，未提交审核 |
| In Review | 已提交，等待合并 PR |
| Ready | 可发布（合并 PR 后由 CI 自动上线） |

---

## 七、Step 5 — 图片上传配置

已在 `config.yml` 中配置：

```yaml
media_folder: static/img/docs    # 仓库内存储路径
public_folder: /img/docs           # 网站访问路径
```

运营上传图片后，Markdown 自动插入：

```markdown
![截图说明](/img/docs/brand/step-1.png)
```

实际访问 URL：`https://adgine.ai/docs/img/docs/brand/step-1.png`

### 截图规范（可转发给运营）

- 格式：PNG 或 WebP
- 宽度：约 1200px
- 命名：`模块-功能-步骤.png`（小写、连字符）
- 敏感信息打码
- 中文文档截中文 UI，英文文档截英文 UI

---

## 八、Step 6（可选）— Cloudflare Access 加固

若希望 **只有公司邮箱** 才能打开 `/admin` 登录页：

1. Cloudflare Dashboard → **Zero Trust** → **Access** → **Applications**
2. 添加应用，域名路径：`adgine-docs.pages.dev/docs/admin` 或 `adgine.ai/docs/admin`
3. Policy：允许 `@adgine.ai` 邮箱或 Google Workspace
4. 免费额度：**50 用户**

这是入口加固，与 GitHub OAuth 互补，不是替代。

---

## 九、新增文档页面（需开发协助）

运营可在后台 **新建** 已有目录下的文档，但 **新增侧边栏入口** 需开发改两个文件：

1. `sidebars.ts` — 添加菜单项
2. `i18n/en/.../current.json` 和 `i18n/zh-TW/.../current.json` — 添加侧边栏翻译

```bash
npm run write-translations -- --locale en
npm run write-translations -- --locale zh-TW
```

然后补全新 key 的英文/繁体 message。

---

## 十、验收清单

部署完成后逐项检查：

- [ ] `https://adgine.ai/docs/admin/` 可打开
- [ ] 点击 **Login with GitHub** 可完成授权
- [ ] 能看到文档列表（简体中文 · 开始 等）
- [ ] 编辑一篇文档并 **Save** → GitHub 出现新 PR
- [ ] PR 触发 Cloudflare Pages 预览链接
- [ ] 合并 PR 后 `https://adgine.ai/docs/` 内容更新
- [ ] 上传图片后页面可正常显示
- [ ] 无 Write 权限的账号无法保存

---

## 十一、故障排查

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| Login 后报错 | Worker 地址或 Client Secret 错误 | 检查 `config.yml` base_url 与 wrangler secrets |
| 保存失败 404 | 无仓库 Write 权限 | 添加协作者 |
| 图片不显示 | `public_folder` 路径错误 | 应用 `/img/docs/...`，非外链 |
| OAuth callback 失败 | Callback URL 与 Worker 不一致 | 回 GitHub OAuth App 修改 |
| 样式丢失 | 正常，admin 页独立样式 | 不影响文档站 |

---

## 十二、相关文件

| 路径 | 说明 |
|------|------|
| `static/admin/index.html` | Decap 入口页 |
| `static/admin/config.yml` | 后台配置（集合、图片目录） |
| `workers/decap-oauth/` | OAuth Worker |
| `static/img/docs/` | 运营上传的配图 |
| [ops-editor-guide.md](./ops-editor-guide.md) | 运营操作手册 |
| [cloudflare-pages.md](./cloudflare-pages.md) | 文档站部署 |
| [nginx-adgine-docs.conf](./nginx-adgine-docs.conf) | Nginx 反代 |

---

## 十三、与产品发版联动

每个 GEO-Dashboard 功能发版：

1. 产品通知运营更新文档
2. 运营在 Decap 后台编辑 + 截图
3. 提交 PR，产品审核预览
4. 合并后更新 `更新日志` 集合
5. 开发 PR 勾选文档同步 checkbox（见 `.github/pull_request_template.md`）
