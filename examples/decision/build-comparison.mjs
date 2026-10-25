import fs from 'node:fs/promises';
import {planDesign} from '../../skill/leego-design-ppt/scripts/plan-design.mjs';
const root=new URL('./',import.meta.url);
const sources=['合成测试数据，仅用于设计比较'];
const brief={audience:'股东',goal:'比较趋势和职责的表达方式',scenario:'shareholder-review',delivery:'pptx',brand:{approved:true,theme:'purple-tech'},slides:[{id:'trend',intent:'trend',data:{available:true,labels:4,series:1,hasMissing:false,unit:'万元',period:'示例季度',source:sources[0]}},{id:'layers',intent:'architecture',items:3}]};
const plan=planDesign(brief);
const base={schemaVersion:'2.0',title:'同题设计比较',language:'zh-CN',audience:brief.audience,purpose:brief.goal,centralTakeaway:'由页面任务决定表达方式',brand:{name:'Leego Design PPT'},theme:'purple-tech',style:{fontFace:'Source Han Sans SC'},slides:[{id:'trend',narrativeJob:'呈现季度变化',layout:'executive-summary',title:'季度收入持续增长',body:'同一组数据：展示时间变化，而非四个孤立数字。',items:[{title:'第一季度',value:30},{title:'第二季度',value:45},{title:'第三季度',value:50},{title:'第四季度',value:70}],sources},{id:'layers',narrativeJob:'明确系统分层与职责',layout:'executive-summary',title:'三层职责需要清晰分开',body:'同样的内容，通过层级关系展示职责。',items:[{title:'数据层',body:'统一数据口径与来源'},{title:'应用层',body:'承载业务操作与规则'},{title:'治理层',body:'管理权限与异常追踪'}],sources}]};
const after=structuredClone(base);after.slides.forEach((s,i)=>s.layout=plan.pages[i].layout);delete after.slides[0].items;after.slides[0].chart={type:plan.pages[0].component,unit:'万元',period:'示例季度',labels:['第一季度','第二季度','第三季度','第四季度'],series:[{name:'收入',values:[30,45,50,70]}]};
await fs.writeFile(new URL('comparison-before.json',root),JSON.stringify(base,null,2)+'\n');await fs.writeFile(new URL('comparison-after.json',root),JSON.stringify(after,null,2)+'\n');await fs.writeFile(new URL('comparison-plan.json',root),JSON.stringify(plan,null,2)+'\n');
