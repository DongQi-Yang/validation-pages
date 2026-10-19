# validation-pages — 阶段 2 假门落地页

两页共用 `shared/site.css` 与 `shared/form.js`。纯静态，GitHub Pages 直接托管。

| 目录 | 候选 | 价格测试 | 验证记录 |
|---|---|---|---|
| `tracks/` | 多轨现场录音机 | $29.99 once | `~/side-hustle/pipeline/validation/multitrack-field-recorder.md` |
| `loud/` | 对白修复 | $9.99 once | `~/side-hustle/pipeline/validation/dialogue-repair.md` |

## 上线前三件事（都在你账号里，各 5 分钟）

1. **表单端点**：Formspree（formspree.io，免费档 50 条/月）或 Tally 建一个表单，字段 `email`、`intent`、`product`、`page`、`ref`。把端点 URL 填进两页 `<script>window.FORM_ENDPOINT = "";</script>`。
   Formspree 例：`https://formspree.io/f/xxxxxxxx`。
2. **访问统计**：Cloudflare Dashboard → Web Analytics → Add a site（你的 Cloudflare 账号已有）→ 复制 beacon `<script>` 粘到两页末尾注释处。免费、无 cookie。
3. **发布**：
   ```bash
   cd ~/Projects/validation-pages
   git init && git add -A && git commit -m "fake-door pages for tracks + loud"
   gh repo create validation-pages --public --source=. --push
   gh api -X POST repos/{owner}/validation-pages/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'
   ```
   地址：`https://<你的 GitHub 用户名>.github.io/validation-pages/tracks/` 与 `/loud/`。
   建议用个人身份 `git config user.email`（见 side-project-git-identity 备忘）。

## 怎么读数

- 转化率 = 表单提交数 ÷ Cloudflare 访问数。按 `intent` 拆：`preorder` 点击率 ≥3% 或 `waitlist` ≥10% 过线。
- `ref` 字段告诉你哪条帖子/私信带来的人。
- 本地预览：`python3 -m http.server -d ~/Projects/validation-pages 8000` 然后开 http://localhost:8000/tracks/

## 文案规则

- 标题只用访谈里的原话或其直接改写；验证期间每周最多换一次标题，换了就在验证记录里写下日期。
- 不加功能列表以外的承诺。页面说的每一条都必须是 1.0 会做的。
