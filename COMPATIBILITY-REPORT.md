# Leego Design PPT 2.1.0 升级与验证

验证日期：2026-10-25。本文记录实际测试范围；通过本地测试不代表所有客户端、操作系统和 Office 版本均已验收。

## 兼容性修复

- 安装 ZIP 根目录直接包含 `SKILL.md`，移除原有多层仓库目录；随包提供依赖锁文件。
- PPTX 生成改为公开的 PptxGenJS 4.0.1，不再要求 Codex 私有模块或运行时路径。基础要求为 Node.js 20+。
- HTML 无 CDN 依赖；图片打包到本地，中文和空格路径可用。
- PPTX 保留原生文本、形状、图片、表格与图表，图表包含可编辑的数据工作簿。图片支持完整展示与指定焦点裁切。
- PDF 从最终 PPTX 导出，缺少 LibreOffice 时明确报错。增加临时字体目录配置，修复本次无界面导出中文方框问题；不打包字体、不修改系统字体设置。
- 无效图片、未知图表值、不支持的混合内容和过密文字会明确报错，避免生成看似成功但丢失内容的文件。

## 从既有 PPT 与 UI 工作沉淀的规范

| 经验 | 写入 Skill 的规则 | 适用边界 |
|---|---|---|
| 修改旧稿需要保留已批准方向 | 先识别交付物与修改范围，局部修订不强制重建整套演示 | 用户明确要求重构时再调整叙事和模板 |
| 演示需要结论而非资料堆叠 | 一页一个任务和核心结论，证据与行动连贯 | 内容不足时补逻辑，不编造业务事实 |
| 中文孤字、字体替换影响成品 | 语义字号层级、中文零负字距、尾行检查、实际字体与回退说明 | 不把后台 UI 的 14px 字号搬到投影页 |
| 品牌与图片失真影响可信度 | 明确完整展示或裁切，保留比例、焦点、透明度和授权边界 | 不将单个项目的装饰或配色升为通用规范 |
| 表格、图表需要解释真实数据 | 保留单位、期间、分母、来源；未知不等于零；原生可编辑对象优先 | 不把截图称为可编辑系统或真实集成 |
| UI 需要一致语义与更少干扰 | 沿用字体层级、图标语义和状态颜色，减少重复卡片和容器 | 不搬入后台侧栏、登录框、悬浮操作和固定列行为 |
| 交付与发布是不同状态 | 只输出所需格式，逐页检查，分别记录本地生成、客户端安装、公开发布与接收方验收 | 成功构建不等于视觉通过或正式上线 |

完整规则位于 [Skill](skill/leego-design-ppt/SKILL.md)、[交互经验](skill/leego-design-ppt/references/interaction-lessons.md) 和 [UI 到演示的转换规范](skill/leego-design-ppt/references/ui-to-presentation.md)。公开材料仅包含通用规则与合成示例，不包含客户稿件、私有数据或字体文件。

## 验证结果

| 项目 | 结果与范围 |
|---|---|
| WorkBuddy 5.6.2 / macOS | ZIP 上传通过平台安全检测，显示“安全”；完成安装，`leego-design-ppt` 出现在“用户自定义”并启用。此项验证安装流程，未执行 WorkBuddy 内完整生成任务。扫描后仅修正文档中的 PDF 描述与检查边界，生成代码未变 |
| Codex 本机 Skill | 已更新至 2.1.0，旧版已备份；依赖安装和 Skill 格式验证通过 |
| 独立安装包 | 最终 ZIP 在中文及空格临时路径中解压，清除 Codex 专用环境变量，执行全新 `npm ci --ignore-scripts`，PPTX/HTML 生成通过 |
| 自动回归 | 4 项通过：原生对象与中文路径、离线网页资源、不合法输入拒绝、零值与主题和边界 |
| PPTX 结构 | 文字、图片、原生表格、柱形图和折线图及嵌入的 XLSX 数据均已检查 |
| PDF 与视觉 | 11 页演示 + 6 页兼容示例共 17 页已渲染检查；中文字体实际嵌入，图片比例、裁切、表格及正负值图表已检查 |
| 网页 | 概览、翻页、图片加载已检查；320px、390px 阅读模式无整页横向溢出 |
| 网站源码 | lint 与生产构建通过；此结果不等于网站已部署 |
| 豆包工作 | 未进行原生客户端安装/生成实测；提供有条件导入说明和任务附件降级方式，不承诺通用安装命令 |
| Windows、PowerPoint、WPS | 未实机验收；需在接收方字体和 Office 环境中打开检查 |

WorkBuddy 官方安装说明：[技能市场](https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)。入口为“专家·技能·连接器 → 技能 → 添加技能 → 上传技能”。下载链接本身不等于客户端自动安装。

## 安装包与复现

- [2.1.0 安装包](public/downloads/leego-design-ppt-2.1.0.zip)
- [SHA-256 校验文件](public/downloads/leego-design-ppt-2.1.0.zip.sha256)
- [安装与能力说明](skill/leego-design-ppt/references/compatibility.md)
- [可编辑演示](public/downloads/leego-design-ppt-demo.pptx) · [PDF 演示](public/downloads/leego-design-ppt-demo.pdf)

在 Skill 解压目录执行 `npm ci --ignore-scripts` 和 `node scripts/doctor.mjs`。HTML 不需要 npm 包；PPTX 需要随包锁定的公开依赖；PDF 另需 LibreOffice 或宿主提供的 PowerPoint/WPS 导出能力。

仓库回归命令为 `npm run test:portable`。网页质量检查与逐页视觉检查需另行完成，不能只依赖这四项自动测试。
