#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {parseArgs} from './lib.mjs';
const library=JSON.parse(await fs.readFile(new URL('../data/design-library.json',import.meta.url),'utf8'));
export function planDesign(brief) {
 if(!brief.audience||!brief.goal||!Array.isArray(brief.slides)||!brief.slides.length)throw new Error('Need audience, goal and slide intents');
 const scenario=library.scenarios.find(s=>s.id===brief.scenario);if(!scenario)throw new Error('Choose a supported scenario from data/design-library.json; do not guess silently');
 const preserve=brief.brand?.approved===true;
 const styles=scenario.styles.map(id=>library.styles.find(s=>s.id===id));
 const ids=new Set();
 const pages=brief.slides.map(slide=>{
  if(!/^[a-z0-9-]+$/.test(slide.id||'')||ids.has(slide.id))throw new Error('Unique slide id required');ids.add(slide.id);
  let layout,component=null,status='ready',reason=[],warnings=[];
  const count=slide.items??0;
  if(!Number.isInteger(count)||count<0)throw new Error('items must be a nonnegative count');
  if(['trend','ranking','distribution','composition'].includes(slide.intent)){
   const d=slide.data;
   if(!d?.available||d.hasMissing||!d.unit||!d.period||!d.source){layout='table';status='needs-evidence';reason.push('保留缺失状态，补齐单位、期间和来源后再画图');}
   else if(!Number.isInteger(d.labels)||d.labels<1||!Number.isInteger(d.series)||d.series<1)throw new Error('Chart label and series counts must be positive integers');
   else if(['distribution','composition'].includes(slide.intent)){layout='table';status='custom-required';reason.push('当前基础图表仅支持柱形和折线；分布/构成需专项可视化，不假称已支持');}
   else {layout='chart';component=slide.intent==='trend'?'line':'bar';reason.push(slide.intent==='trend'?'时间变化用折线表达':'量级或排名用柱形比较');if(d.labels>8||d.series>3){status='split-required';warnings.push('基础引擎每图最多 8 个标签、3 个序列');}}
  }else if(['photo','screenshot','brand-sheet'].includes(slide.intent)){
   if(!Number.isInteger(slide.visuals)||slide.visuals<0)throw new Error('visuals must be a nonnegative count');
   if(!slide.visuals){layout='executive-summary';status='needs-evidence';reason.push('缺少真实素材，先交付文字结构并列出素材缺口');}
   else {layout=slide.intent==='brand-sheet'?'vi-showcase':slide.visuals===2?'dual-screenshot':slide.visuals>2?'evidence-wall':'split-visual';component='contain';reason.push('默认完整展示证据和产品，裁切必须另行明确焦点');if(slide.visuals>4){status='split-required';warnings.push('每页最多 4 张证据图');}}
  }else if(slide.intent==='comparison'&&slide.table){layout='table';reason.push('逐项对比保留可编辑表格');if(!Number.isInteger(slide.table.rows)||slide.table.rows<1||!Number.isInteger(slide.table.columns)||slide.table.columns<1)throw new Error('Table dimensions must be positive integers');if(slide.table.rows>7||slide.table.columns>6){status='split-required';warnings.push('表格按组拆分，最多 7 行、6 列');}}
  else {const mapping={cover:'cover',conclusion:'executive-summary',comparison:'comparison',architecture:'architecture',process:'process',roadmap:'roadmap',kpi:'kpi',decision:'decision-close'};layout=mapping[slide.intent];if(!layout)throw new Error(`Unsupported intent: ${slide.intent}`);reason.push(`按页面任务选择 ${layout}，不按装饰偏好随机套版`);if(layout==='cover'&&count){status='split-required';warnings.push('封面保持主张，条目移到正文');}}
  const pattern=library.patterns.find(p=>p.id===layout);
  if(count>pattern.maxItems){status='split-required';warnings.push(`该模式最多 ${pattern.maxItems} 项，先拆页再排版`);}
  return {id:slide.id,layout,component,status,reason,warnings,implementation:pattern.implementation};
 });
 return {schemaVersion:1,libraryVersion:library.version,scenario:scenario.id,audience:brief.audience,goal:brief.goal,styles:preserve?['approved-brand']:styles.map(s=>s.id),theme:preserve?(brief.brand.theme??null):styles[0].theme,preserveApprovedBrand:preserve,themeNote:preserve?'保留已有模板；未提供可编码主题时不要覆盖':'风格族是设计指导，当前自动生成使用两个已实现主题之一',arc:scenario.arc,pages,requiresReview:pages.some(p=>p.status!=='ready'),outputs:brief.delivery?[brief.delivery]:['pptx'],source:'local-reviewed-library'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const args=parseArgs(process.argv);try{const p=planDesign(JSON.parse(await fs.readFile(args.input,'utf8')));const out=JSON.stringify(p,null,2)+'\n';if(args.output)await fs.writeFile(args.output,out);else process.stdout.write(out);}catch(e){console.error(e.message);process.exitCode=1;}
}
