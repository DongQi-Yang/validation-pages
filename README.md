# validation-pages — 阶段 2 假门落地页

两页共用 `shared/site.css` 与 `shared/form.js`。纯静态，GitHub Pages 直接托管。

| 目录 | 候选 | 价格测试 | 验证记录 |
|---|---|---|---|
| `tracks/` | 多轨现场录音机 | $29.99 once | `~/side-hustle/pipeline/validation/multitrack-field-recorder.md` |
| `loud/` | 对白修复 | $9.99 once | `~/side-hustle/pipeline/validation/dialogue-repair.md` |

## 上线前三件事（都在你账号里，各 5 分钟）

1. **表单端点**：已接 Google 表单「Early access」（账号 ghostooydq@gmail.com），后台看回复：
   https://docs.google.com/forms/d/1_xIhHyUWw_PjbKy-9UwuY12RBvqGgk8p755_OgHafSQ/edit#responses
   页面用 no-cors POST 到 formResponse，四个 entry ID 已写在两页 `window.FORM_FIELDS`，2026-10-19 真实提交验证通过。
   注意：若在表单里改题目类型，entry ID 可能变，用 `python3 -c` 重新解析 viewform 的 FB_PUBLIC_LOAD_DATA_。
   2026-10-19 的 3 条测试数据（selftest/pytest/pagetest@example.com）统计时要剔除。
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
