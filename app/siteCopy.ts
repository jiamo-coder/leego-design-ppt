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
  nav: { capabilities: "能力", layouts: "版式", quality: "质量", download: "获取 2.2.1" },
  hero: {
    version: "版本 2.2.1 · 演示系统",
    lineOne: "先判断内容。",
    lineTwo: "再决定设计。",
    lead: "从受众、决策和证据出发，选择适合的叙事、版式与图表。保留 H5 交互演示、可编辑 PPTX 和配套 PDF，让新经验通过经过验证的规则持续进入下一次创作。",
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
    label: "01 / 内容驱动的选择",
    title: "同一份内容，\n选择有理由的表达。",
    lead: "先判断是趋势、比较、结构还是实物证据，再选择图表与页面。缺少数据时保留缺口，已有品牌和模板优先保留；按需要输出一种或多种格式。",
  },
  outputs: [
    { no: "01", title: "自适应网页演示", body: "16:9 演示与移动阅读模式，保留键盘翻页、触控、概览和讲稿；资源可离线携带。" },
    { no: "02", title: "可编辑 PPTX", body: "保留原生文字、形状、独立图片、表格与柱形／折线图；图片内容本身不变成可编辑矢量。" },
    { no: "03", title: "配套 PDF", body: "从最终 PPTX 导出并复核字体、页数和排版。" },
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
    title: "8 个风格族，\n20 类基础页面任务。",
    body: "风格族指导设计选择，基础版式承担页面任务。当前提供两个具体配色主题；页面数量不等于独立渲染模板数量。",
    items: ["封面", "结论摘要", "时间线", "问题矩阵", "原则页", "图文分栏", "架构", "数据流", "流程", "双截图", "产品矩阵", "VI 展示", "对比", "治理", "证据墙", "路线图", "KPI", "决策收束", "数据表格", "趋势与比较图"],
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
    body: "自动检查拦截无效输入与内容超限，逐页视觉检查评估实际成品。规则匹配通过，不等于审美已通过。",
    items: [
      ["叙事", "每页只有一个任务和一个核心主张"],
      ["排版", "不出现孤字、单字落行或标题意外换行"],
      ["图片", "不做无意义裁切，不放大低分辨率图片"],
      ["品牌", "不残留旧 Logo、名称、元数据或备注"],
      ["文件", "页数、顺序、来源一致，文件可以正常打开"],
      ["响应式", "按交付检查桌面、移动阅读、缩放与减少动画偏好"],
    ],
  },
  release: {
    label: "07 / 发布通道",
    title: "安装一次。\n按需交付。\n持续获得新规范。",
    body: "下载 2.2 安装包，按客户端支持的方式导入。WorkBuddy 2.1 安装流程已验证；豆包工作原生导入尚未实测。运行脚本需要 Node.js，PDF 另需转换器。",
    downloadSkill: "下载 Skill ZIP",
    examplePptx: "PPTX 示例 ↓",
    examplePdf: "PDF 示例 ↓",
    github: "GitHub ↗",
  },
  version: { live: "实时发布通道", snapshot: "内置版本快照", updated: "更新时间" },
  footer: "演示系统 · 版本 2.2.1 · 更新于 2026-10-25",
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
  nav: { capabilities: "Capabilities", layouts: "Layouts", quality: "Quality", download: "Get 2.2.1" },
  hero: {
    version: "Version 2.2.1 · Presentation system",
    lineOne: "Read the content.",
    lineTwo: "Choose the design.",
    lead: "Choose narrative, layout and charts around the audience, decision and evidence. Keep interactive H5, editable PPTX and companion PDF, with reviewed rules available on the next task.",
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
    label: "01 / CONTENT-DRIVEN DESIGN",
    title: "One body of evidence.\nA reason for every design choice.",
    lead: "Distinguish trends, comparisons, structures and real visual evidence before selecting a page. Preserve missing data, approved brands and templates. Deliver only the requested formats.",
  },
  outputs: [
    { no: "01", title: "Responsive HTML", body: "16:9 presentation and mobile reading modes, keyboard and touch navigation, overview, notes and offline assets." },
    { no: "02", title: "Editable PPTX", body: "Native text, shapes, separate images, tables and bar/line charts. Image pixels do not become editable vector artwork." },
    { no: "03", title: "Companion PDF", body: "Exported from the final PPTX, then checked for fonts, page count, and layout." },
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
    title: "8 style families.\n20 baseline page purposes.",
    body: "Style families guide decisions; baseline patterns serve page purposes. Two concrete color themes are implemented. Pattern counts do not imply distinct rendering engines.",
    items: ["Cover", "Executive summary", "Timeline", "Problem matrix", "Principles", "Split visual", "Architecture", "Data flow", "Process", "Dual screenshot", "Product matrix", "VI showcase", "Comparison", "Governance", "Evidence wall", "Roadmap", "KPI", "Decision close", "Data table", "Trend / comparison chart"],
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
    body: "Automated checks catch invalid input and content limits; page-by-page review evaluates the rendered result. A passing selector test is not aesthetic approval.",
    items: [
      ["Narrative", "One job and one primary claim per slide"],
      ["Typography", "No orphan characters or accidental title wraps"],
      ["Imagery", "No meaningless crop or low-resolution enlargement"],
      ["Brand", "No old logo, name, metadata, or note residue"],
      ["Files", "Matched page count, order, sources, and openability"],
      ["Responsive", "Check desktop, mobile reading, zoom and reduced-motion preferences"],
    ],
  },
  release: {
    label: "07 / RELEASE CHANNEL",
    title: "Install the skill.\nChoose your outputs.\nReceive reviewed rules.",
    body: "Import the 2.2 package using your host’s supported flow. WorkBuddy import was verified with 2.1; Doubao native import is untested. Scripts require Node.js and PDF requires an exporter.",
    downloadSkill: "Download Skill ZIP",
    examplePptx: "Example PPTX ↓",
    examplePdf: "Example PDF ↓",
    github: "GitHub ↗",
  },
  version: { live: "LIVE RELEASE CHANNEL", snapshot: "BUNDLED RELEASE SNAPSHOT", updated: "Updated" },
  footer: "Presentation system · Version 2.2.1 · Updated 2026-10-25",
};

export const siteCopy: Record<Locale, SiteCopy> = { zh, en };
