export type Locale = "zh" | "en";

type Output = { no: string; title: string; body: string };
type CaseStudy = { kind: string; before: string; after: string; note: string };

export type SiteCopy = {
  a11y: { primaryNavigation: string; home: string; supportedOutputs: string; openDemo: string; principles: string; colorSystem: string; language: string };
  nav: { capabilities: string; layouts: string; quality: string; download: string };
  hero: { version: string; lineOne: string; lineTwo: string; lead: string; explore: string; method: string };
  stage: { live: string; responsive: string; eyebrow: string; title: string; context: string; evidence: string; decision: string; open: string; controls: string };
  principles: string[];
  capabilities: { label: string; title: string; lead: string };
  outputs: Output[];
  method: { label: string; title: string; body: string; steps: Array<{ no: string; title: string; body: string }> };
  layouts: { label: string; title: string; body: string; items: string[] };
  system: { label: string; title: string; body: string; swatches: Array<{ name: string; value: string }> };
  cases: { label: string; title: string; before: string; after: string; items: CaseStudy[] };
  quality: { label: string; title: string; body: string; items: Array<[string, string]> };
  release: { label: string; title: string; body: string; downloadSkill: string; examplePptx: string; examplePdf: string; github: string };
  version: { live: string; snapshot: string; updated: string };
  footer: string;
};

const zh: SiteCopy = {
  a11y: {
    primaryNavigation: "主导航",
    home: "Leego Design PPT 首页",
    supportedOutputs: "支持的输出格式",
    openDemo: "打开交互式演示",
    principles: "核心原则",
    colorSystem: "紫蓝科技色彩系统",
    language: "切换网站语言",
  },
  nav: { capabilities: "能力", layouts: "版式", quality: "质量", download: "获取 2.0.0" },
  hero: {
    version: "版本 2.0.0 · 演示系统",
    lineOne: "一个叙事。",
    lineTwo: "三种精准输出。",
    lead: "一套严谨的演示设计 Skill，把证据、品牌资产与项目语境，转化为自适应网页演示、可编辑 PPTX 和稳定可靠的 PDF。",
    explore: "查看交互演示",
    method: "了解方法 →",
  },
  stage: {
    live: "实时演示 / 01",
    responsive: "16:9 · 自适应",
    eyebrow: "决策叙事",
    title: "清晰不是最后的修饰，\n而是一套系统。",
    context: "语境",
    evidence: "证据",
    decision: "决策",
    open: "打开交互演示 ↗",
    controls: "讲稿 · 总览 · 触控",
  },
  principles: ["先有策略，再做页面。", "先完整呈现，再考虑裁切。", "先有证据，再做装饰。", "先通过质检，再正式交付。"],
  capabilities: {
    label: "01 / 单一语义源",
    title: "一次编写 deck-spec.json，\n多端交付不发生叙事漂移。",
    lead: "受众、用途、证据、主题、图片适配、来源标注与演讲备注，在每一种输出中始终保持关联。",
  },
  outputs: [
    { no: "01", title: "自适应网页演示", body: "演示模式保持 16:9，阅读模式覆盖五档视口并重新排版。" },
    { no: "02", title: "可编辑 PPTX", body: "文字、图片、图表、表格和基础形状均保持可编辑。" },
    { no: "03", title: "稳定版式 PDF", body: "由最终高分辨率页面渲染生成，避免字体替换与版式漂移。" },
  ],
  method: {
    label: "02 / 工作方法",
    title: "好演示，在打开画布之前就已经开始。",
    body: "Leego Design PPT 先明确沟通任务、证据边界与品牌资产清单。只有论证稳定后，才进入版式选择。",
    steps: [
      { no: "01", title: "理解", body: "受众、决策、资料与约束。" },
      { no: "02", title: "结构", body: "一页一任务，一页一主张，叙事逐步推进。" },
      { no: "03", title: "编排", body: "栅格、字体、留白与图片意图。" },
      { no: "04", title: "验证", body: "视觉、文件、品牌与来源质量检查。" },
    ],
  },
  layouts: {
    label: "03 / 版式模板库",
    title: "18 种经过验证的叙事任务，\n不使用无意义的通用填充页。",
    body: "每一种版式都对应一个不同的演示问题。",
    items: ["封面", "结论摘要", "时间线", "问题矩阵", "原则页", "图文分栏", "架构", "数据流", "流程", "双截图", "产品矩阵", "VI 展示", "对比", "治理", "证据墙", "路线图", "KPI", "决策收束"],
  },
  system: {
    label: "04 / 紫蓝科技",
    title: "纯净色彩。清晰字体。\n克制而准确的强调。",
    body: "无需装饰性渐变、玻璃效果或层叠卡片，也能表达专业与精确。",
    swatches: [
      { name: "深海军蓝", value: "#10132E" },
      { name: "品牌紫", value: "#6546FF" },
      { name: "冰蓝", value: "#CFE6FF" },
      { name: "冷灰白", value: "#F7F8FC" },
    ],
  },
  cases: {
    label: "05 / 脱敏案例",
    title: "工作目标不是“再好看一点”，\n而是让论证真正被看见。",
    before: "优化前",
    after: "优化后",
    items: [
      { kind: "品牌手册", before: "素材集合", after: "品牌叙事", note: "VI、产品、空间、包装与场景拥有各自清晰的视觉角色。" },
      { kind: "产品介绍", before: "功能罗列", after: "决策故事", note: "能力与证据、治理、责任人和下一步行动形成连接。" },
      { kind: "领导汇报", before: "高密度原稿", after: "管理者简报", note: "结论被压缩、排序，并以清晰决策完成收束。" },
    ],
  },
  quality: {
    label: "06 / 质量契约",
    title: "构建完成，不等于验收通过。",
    body: "每一页都会重新渲染并逐页检查；文件完整性、视觉质量与敏感信息分别验证。",
    items: [
      ["叙事", "每页只有一个任务和一个核心主张"],
      ["排版", "不出现孤字、单字落行或标题意外换行"],
      ["图片", "不做无意义裁切，不放大低分辨率图片"],
      ["品牌", "不残留旧 Logo、名称、元数据或备注"],
      ["文件", "页数、顺序、来源一致，文件可以正常打开"],
      ["响应式", "覆盖 1440 / 1024 / 768 / 390 / 320 px 与 200% 缩放"],
    ],
  },
  release: {
    label: "07 / 发布通道",
    title: "安装 Skill。\n查看示例。\n生成三种输出。",
    body: "公开安装包只包含脱敏后的规则、模板、脚本和示例内容。",
    downloadSkill: "下载 Skill ZIP",
    examplePptx: "PPTX 示例 ↓",
    examplePdf: "PDF 示例 ↓",
    github: "GitHub ↗",
  },
  version: { live: "实时发布通道", snapshot: "内置版本快照", updated: "更新时间" },
  footer: "演示系统 · 版本 2.0.0 · 更新于 2026-09-01",
};

const en: SiteCopy = {
  a11y: {
    primaryNavigation: "Primary navigation",
    home: "Leego Design PPT home",
    supportedOutputs: "Supported outputs",
    openDemo: "Open the interactive deck preview",
    principles: "Core principles",
    colorSystem: "Purple tech color system",
    language: "Switch website language",
  },
  nav: { capabilities: "Capabilities", layouts: "Layouts", quality: "Quality", download: "Get 2.0.0" },
  hero: {
    version: "Version 2.0.0 · Presentation system",
    lineOne: "One story.",
    lineTwo: "Three precise outputs.",
    lead: "A disciplined presentation skill that turns evidence, brand assets, and project context into responsive web decks, editable slides, and reliable PDFs.",
    explore: "Explore the live deck",
    method: "Read the method →",
  },
  stage: {
    live: "LIVE DECK / 01",
    responsive: "16:9 · RESPONSIVE",
    eyebrow: "DECISION NARRATIVE",
    title: "Clarity is a system,\nnot a finishing touch.",
    context: "CONTEXT",
    evidence: "EVIDENCE",
    decision: "DECISION",
    open: "OPEN INTERACTIVE DEMO ↗",
    controls: "Notes · Overview · Touch",
  },
  principles: ["Strategy before slides.", "Contain before crop.", "Evidence before ornament.", "QA before delivery."],
  capabilities: {
    label: "01 / ONE SEMANTIC SOURCE",
    title: "Author once in deck-spec.json.\nDeliver without narrative drift.",
    lead: "Audience, purpose, evidence, theme, image fit, source labels, and speaker notes stay connected across every output.",
  },
  outputs: [
    { no: "01", title: "Responsive HTML", body: "16:9 presentation mode plus reading layouts for five viewport widths." },
    { no: "02", title: "Editable PPTX", body: "Text, images, charts, tables, and basic geometry stay editable." },
    { no: "03", title: "Pixel-stable PDF", body: "Built from final high-resolution slide renders to prevent layout drift." },
  ],
  method: {
    label: "02 / THE METHOD",
    title: "Good slides begin before the canvas.",
    body: "Leego Design PPT starts with the communication job, evidence boundary, and brand inventory. Layout is selected only after the argument is stable.",
    steps: [
      { no: "01", title: "Understand", body: "Audience, decision, sources, constraints." },
      { no: "02", title: "Structure", body: "One slide job, one claim, cumulative arc." },
      { no: "03", title: "Compose", body: "Grid, type, whitespace, image intent." },
      { no: "04", title: "Verify", body: "Visual, file, brand, and source QA." },
    ],
  },
  layouts: {
    label: "03 / LAYOUT LIBRARY",
    title: "18 tested narrative jobs.\nNo generic page filler.",
    body: "Each layout exists because it answers a different presentation question.",
    items: ["Cover", "Executive summary", "Timeline", "Problem matrix", "Principles", "Split visual", "Architecture", "Data flow", "Process", "Dual screenshot", "Product matrix", "VI showcase", "Comparison", "Governance", "Evidence wall", "Roadmap", "KPI", "Decision close"],
  },
  system: {
    label: "04 / PURPLE TECH",
    title: "Flat color. Crisp type.\nA disciplined accent.",
    body: "No ornamental gradient, glass effect, or card pile is needed to communicate precision.",
    swatches: [
      { name: "INK", value: "#10132E" },
      { name: "PURPLE", value: "#6546FF" },
      { name: "ICE", value: "#CFE6FF" },
      { name: "PAPER", value: "#F7F8FC" },
    ],
  },
  cases: {
    label: "05 / ANONYMIZED CASES",
    title: "The work is not “make it prettier.”\nIt is make the argument visible.",
    before: "BEFORE",
    after: "AFTER",
    items: [
      { kind: "Brand book", before: "Asset collection", after: "Brand-led narrative", note: "VI, product, space, packaging, and scenarios gain distinct visual roles." },
      { kind: "Product introduction", before: "Feature inventory", after: "Decision story", note: "Capabilities connect to evidence, governance, owners, and next actions." },
      { kind: "Leadership report", before: "Dense source deck", after: "Executive brief", note: "Claims are shortened, ordered, and closed with a clear decision." },
    ],
  },
  quality: {
    label: "06 / QA CONTRACT",
    title: "A build is not an approval.",
    body: "Every final page is rendered and reviewed. Files are checked separately from visual quality and sensitive information.",
    items: [
      ["Narrative", "One job and one primary claim per slide"],
      ["Typography", "No orphan characters or accidental title wraps"],
      ["Imagery", "No meaningless crop or low-resolution enlargement"],
      ["Brand", "No old logo, name, metadata, or note residue"],
      ["Files", "Matched page count, order, sources, and openability"],
      ["Responsive", "1440 / 1024 / 768 / 390 / 320 px + 200% zoom"],
    ],
  },
  release: {
    label: "07 / RELEASE CHANNEL",
    title: "Install the skill.\nInspect the example.\nBuild all three outputs.",
    body: "The public package includes only anonymized rules, templates, scripts, and example content.",
    downloadSkill: "Download Skill ZIP",
    examplePptx: "Example PPTX ↓",
    examplePdf: "Example PDF ↓",
    github: "GitHub ↗",
  },
  version: { live: "LIVE RELEASE CHANNEL", snapshot: "BUNDLED RELEASE SNAPSHOT", updated: "Updated" },
  footer: "Presentation system · Version 2.0.0 · Updated 2026-09-01",
};

export const siteCopy: Record<Locale, SiteCopy> = { zh, en };
