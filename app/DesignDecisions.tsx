"use client";
import {useState} from "react";
import type {Locale} from "./siteCopy";
const cases = [
 {zh:"股东经营汇报",en:"Shareholder review",inputZh:"突出经营结果、问题和下一年度资源配置。",inputEn:"Explain results, problems and next-year resource allocation.",styleZh:"专业咨询 × 数据经营",styleEn:"Consulting × Data operations",arcZh:"经营结论 → 业绩证据 → 问题诊断 → 战略与决策",arcEn:"Conclusion → Performance → Diagnosis → Strategic decision",pagesZh:["时间趋势：折线图","品类比较：柱形图或表格","行动规划：阶段路线图"],pagesEn:["Time trend: line chart","Category comparison: bar chart or table","Action plan: phased roadmap"],boundaryZh:"缺少单位、期间或来源，先补证据；未知值不画成零。",boundaryEn:"Missing units, period or source require evidence. Unknown values are not zero."},
 {zh:"品牌合作提案",en:"Brand partnership",inputZh:"用真实产品与空间说明合作价值。",inputEn:"Show partnership value through real products and spaces.",styleZh:"高级品牌 × 图片叙事",styleEn:"Premium brand × Image story",arcZh:"品牌主张 → 产品与场景 → 合作证据 → 边界与下一步",arcEn:"Proposition → Product and context → Evidence → Next steps",pagesZh:["品牌主张：清晰封面","真实产品：完整图文页","合作边界：对照表格"],pagesEn:["Brand proposition: clear cover","Real product: complete image and text","Cooperation terms: comparison table"],boundaryZh:"已有品牌优先保留；图片不足时列出缺口，不虚构门店与成果。",boundaryEn:"Preserve approved branding. List missing images rather than invent stores or results."},
 {zh:"产品技术方案",en:"Product and technology",inputZh:"让客户理解解决方式、系统边界与实施计划。",inputEn:"Explain the solution, system boundaries and implementation plan.",styleZh:"科技创新 × 极简商务",styleEn:"Technology × Minimal business",arcZh:"用户问题 → 解决方式 → 架构证据 → 边界与计划",arcEn:"Problem → Solution → Architecture evidence → Scope and plan",pagesZh:["系统分层：架构页","协作顺序：流程页","界面证据：完整截图"],pagesEn:["System layers: architecture","Collaboration: process","UI evidence: complete screenshots"],boundaryZh:"演示原型与真实接入分开标注，不把光效和动效当作能力证据。",boundaryEn:"Distinguish prototypes from real integration. Effects are not evidence."}
];
export default function DesignDecisions({locale}:{locale:Locale}){
 const [active,setActive]=useState(0),item=cases[active],zh=locale==='zh';
 return <section className="section decision-section" id="decisions">
  <div className="section-label">{zh?"设计决策 / 场景示例":"DESIGN DECISIONS / SCENARIO EXAMPLES"}</div>
  <h2>{zh?"内容变了，选择也应该改变。":"Different content deserves different choices."}</h2>
  <p>{zh?"切换场景，查看设计选择及其边界。以下是规则示例，不是在线生成器。":"Switch scenarios to inspect choices and limits. These are rule examples, not a live generation service."}</p>
  <div className="decision-tabs" role="group" aria-label={zh?"演示场景":"Presentation scenario"}>{cases.map((c,i)=><button type="button" key={c.en} aria-pressed={active===i} onClick={()=>setActive(i)}>{zh?c.zh:c.en}</button>)}</div>
  <div className="decision-result" aria-live="polite">
   <div><small>{zh?"你的任务":"YOUR BRIEF"}</small><h3>{zh?item.inputZh:item.inputEn}</h3><p>{zh?item.boundaryZh:item.boundaryEn}</p></div>
   <div><small>{zh?"设计选择":"DESIGN CHOICE"}</small><h3>{zh?item.styleZh:item.styleEn}</h3><p>{zh?item.arcZh:item.arcEn}</p><ul>{(zh?item.pagesZh:item.pagesEn).map(p=><li key={p}>{p}</li>)}</ul></div>
  </div>
  <figure className="comparison-proof">
   {/* A synthetic exported benchmark, not a borrowed template or client deck. */}
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src="/examples/same-content-comparison.png" width="1280" height="760" loading="lazy" alt={zh?"同题比较：左侧通用数字分栏与三列职责，右侧时间趋势折线与分层职责。数据与文字保持一致。":"Same-content comparison: generic metric and role columns on the left; a time-series line chart and layered responsibilities on the right."} />
   <figcaption>{zh?"实际导出对照 · 左：通用分栏；右：按内容任务选择。两页合成示例用于验证表达方式，不代表所有场景的审美评分。":"Actual exports · Left: generic columns. Right: content-driven choices. Two synthetic pages test representation, not a universal aesthetic score."} <a href="/examples/design-decision-example.pptx" download>{zh?"下载可编辑示例 ↓":"Download editable example ↓"}</a></figcaption>
  </figure>
 </section>;
}
