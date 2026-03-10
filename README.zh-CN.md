# paper-reading-workflow

[![English](https://img.shields.io/badge/README-English-blue?style=for-the-badge)](./README.md)
[![中文](https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-red?style=for-the-badge)](./README.zh-CN.md)

一个可复用、可开源的论文阅读工作流 skill，适用于 AI 研究助手或研究者，帮助你完成：

- 基于**论文标题**、**arXiv 链接**或 **PDF 文件**进行单篇精读；
- 生成**每日日报简报（brief）**和**完整版日报（full report）**；
- 可选地将 Markdown 报告同步到 **Notion**；
- 可选地将生成结果发布到 **GitHub**；
- 可选地将重要论文记录到 **research log**。

> 本仓库按“新手友好”方式组织。
> 仓库中**不包含**任何私人 token、数据库 ID、个人路径或私有记忆内容。

---

## 这个 skill 包含什么

本 skill **只覆盖两个工作流**。

### 1）单篇论文精读
适用于：
- 论文标题
- arXiv 链接
- PDF 文件

工作流：
1. 获取论文内容；
2. 判断当前解读是基于**全文**，还是仅基于**摘要 / 部分可见内容**；
3. 生成结构化精读报告；
4. 可选同步到 Notion；
5. 可选写入 research log。

### 2）每日论文扫描 / 主题扫描
适用于：
- 最近论文日报
- 某个研究方向的论文扫描
- 简报 + full report 输出

工作流：
1. 搜索论文；
2. 去重；
3. 写 brief；
4. 写 full report；
5. 可选发布到 GitHub；
6. 可选同步到 Notion。


---

## 仓库结构

```text
paper-reading-workflow/
├── SKILL.md
├── README.md
├── README.zh-CN.md
├── package.json
├── .env.example
├── .gitignore
├── scripts/
│   ├── sync_markdown_to_notion.mjs
│   ├── sync_paper_to_notion.sh
│   ├── extract_paper_metadata.py
│   └── validate_report_structure.py
└── references/
    ├── deepread-template.md
    ├── daily-brief-template.md
    ├── daily-full-report-template.md
    ├── notion-sync-guide.md
    ├── github-publish-guide.md
    └── research-log-guide.md
```

---

## 快速开始

### 环境要求

你只需要这些常见工具：

- **Node.js** 18+（推荐）
- **Python** 3.9+（推荐）
- **Git**

检查方式：

```bash
node -v
python3 --version
git --version
```

---

## 安装步骤

### 1. 克隆仓库

```bash
git clone <your-repo-url>
cd paper-reading-workflow
```

### 2. 安装 Node 依赖

本仓库使用 [`@tryfabric/martian`](https://www.npmjs.com/package/@tryfabric/martian) 将 Markdown 转换为原生 Notion blocks。

```bash
npm install
```

如果你的机器没有 `npm`，请先安装 Node.js：
- https://nodejs.org/

---

## 如何使用这个 skill

### 阅读 skill 主说明
主工作流写在：

- `SKILL.md`

### 阅读模板和指南
- 单篇精读模板：
  - `references/deepread-template.md`
- 日报简报模板：
  - `references/daily-brief-template.md`
- 日报完整版模板：
  - `references/daily-full-report-template.md`
- Notion 同步指南：
  - `references/notion-sync-guide.md`
- GitHub 发布指南：
  - `references/github-publish-guide.md`
- Research log 指南：
  - `references/research-log-guide.md`

---

## Notion 配置（可选）

如果你**不需要**同步到 Notion，可以直接跳过这一整节。

如果你**需要**同步到 Notion，请按下面步骤操作。

### 第 1 步：创建 Notion integration

1. 打开：https://www.notion.so/my-integrations
2. 创建一个新的 integration；
3. 复制生成的 API key。

### 第 2 步：创建或选择一个 Notion 数据库

在 Notion 中准备一个数据库，用来保存论文报告。

建议的字段：
- `Title`（title）
- `Authors`（rich text）
- `Date`（date）
- `Status`（select）
- `Category`（multi-select）
- `Summary`（rich text）
- `ArXiv Link`（url）
- `PDF Link`（url）
- `GitHub Link`（url，可选）
- `Read At`（date，可选）

### 第 3 步：把 integration 连接到数据库

在 Notion 中：
1. 打开目标数据库；
2. 点击 **Share（共享）**；
3. 把你的 integration 添加进去。

如果你跳过这一步，即使 API key 正确，接口也会失败。

### 第 4 步：配置本地环境变量

先复制示例文件：

```bash
cp .env.example .env
```

然后编辑 `.env`：

```bash
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
NOTION_API_VERSION=2025-09-03
```

> 重要提醒：
> - 不要提交 `.env`
> - 不要在截图中暴露真实 token
> - `.gitignore` 已经默认忽略 `.env`

### 第 5 步：在 shell 中导出环境变量

例如：

```bash
export NOTION_API_KEY="your_notion_api_key"
export NOTION_DATABASE_ID="your_notion_database_id"
export NOTION_API_VERSION="2025-09-03"
```

---

## 如何同步报告到 Notion

### 方式 A：使用 shell 封装脚本

```bash
bash scripts/sync_paper_to_notion.sh \
  --title "[Deep Read] Example Paper" \
  --authors "Author A; Author B" \
  --date "2026-03-10" \
  --arxiv "https://arxiv.org/abs/1234.56789" \
  --pdf "https://arxiv.org/pdf/1234.56789" \
  --categories "Time Series,LLM" \
  --status "Done" \
  --summary "Short summary of the paper" \
  --report-file "/absolute/path/to/report.md"
```

### 方式 B：直接使用 Node 脚本

```bash
node scripts/sync_markdown_to_notion.mjs \
  --title "[Deep Read] Example Paper" \
  --markdown-file "/absolute/path/to/report.md" \
  --authors "Author A; Author B" \
  --date "2026-03-10" \
  --arxiv "https://arxiv.org/abs/1234.56789" \
  --pdf "https://arxiv.org/pdf/1234.56789" \
  --categories "Time Series,LLM" \
  --status "Done" \
  --summary "Short summary of the paper"
```

---

## 从 Markdown 报告中提取元数据

如果你的 Markdown 顶部有类似下面的信息：
- `Paper:`
- `ArXiv:`
- `PDF:`
- `Code:`

可以用这个脚本自动提取：

```bash
python3 scripts/extract_paper_metadata.py /path/to/report.md
```

示例输出：

```json
{
  "paper": "Paper Title",
  "arxiv": "https://arxiv.org/abs/...",
  "pdf": "https://arxiv.org/pdf/...",
  "code": "https://github.com/..."
}
```

---

## 校验报告结构

在发布或同步之前，可以先检查报告结构是否完整：

```bash
python3 scripts/validate_report_structure.py /path/to/report.md
```

这个脚本会检查常见关键项，例如：
- 是否有 H1 标题
- 是否有核心概念部分
- 是否有方法部分
- 是否有实验部分
- 是否有结论部分
- 是否提到了限制 / limitations

---

## 推荐使用流程示例

### 示例 1：单篇论文精读

输入：
- 论文标题，或 arXiv 链接

流程：
1. 打开论文；
2. 如果可能，优先阅读全文；
3. 使用 `references/deepread-template.md`；
4. 保存为 `YYYY-MM-DD-paper-slug-deepread.md`；
5. 如有需要，再同步到 Notion。

### 示例 2：每日论文扫描

输入：
- 某个主题关键词，例如：
  - `time series forecasting`
  - `LLM time series`
  - `multimodal time series`

流程：
1. 搜索该主题相关论文；
2. 按 arXiv id 和标题归一化去重；
3. 用 brief 模板写 `YYYY-MM-DD-brief.md`；
4. 用 full report 模板写 `YYYY-MM-DD-full.md`；
5. 如有需要，推送到 GitHub；
6. 如有需要，同步 full report 到 Notion。

---

## 安全检查清单

在推送到 GitHub 之前，请务必确认：

- `.env` 没有被 Git 跟踪；
- 脚本、Markdown、截图里没有出现 token；
- 没有把本地绝对路径写进公开文件；
- 没有硬编码私有数据库 ID 或仓库地址。

---

## 常见问题

### Q1. 如果我只有摘要怎么办？
必须明确说明当前报告是基于摘要或部分可见内容，而不是全文。不要编造方法细节、实验结果或消融结论。

### Q2. 为什么 Notion 同步推荐用 `@tryfabric/martian`？
因为它会把 Markdown 转成原生 Notion blocks，比纯文本上传更能保留标题、列表、加粗和公式等结构。

### Q3. 为什么 API key 正确了，Notion 还是上传失败？
最常见原因是：目标数据库还没有共享给 integration。

### Q4. 不用 Notion 可以用这个仓库吗？
可以。Notion 相关脚本是可选的。

### Q5. 这些模板可以迁移到别的学科吗？
可以。模板本身是通用的，可以迁移到机器学习、自然语言处理、计算机视觉、生物信息等领域。

---

## License

在正式发布前，你可以自行选择开源协议，例如：
- MIT
- Apache-2.0

本仓库本身不强制绑定某个协议。
