import test from 'node:test';
import assert from 'node:assert/strict';
import {planDesign} from '../skill/leego-design-ppt/scripts/plan-design.mjs';
const base={audience:'股东',goal:'配置资源',scenario:'shareholder-review',delivery:'pptx',slides:[]};
const data={available:true,labels:4,series:1,hasMissing:false,unit:'万元',period:'季度',source:'合成基准'};
const cases=[
 ['time series uses line',{id:'a',intent:'trend',data},'chart','line','ready'],
 ['magnitude uses bar',{id:'a',intent:'ranking',data},'chart','bar','ready'],
 ['unknown is not zero',{id:'a',intent:'trend',data:{...data,hasMissing:true}},'table',null,'needs-evidence'],
 ['native table respects density',{id:'a',intent:'comparison',table:{rows:10,columns:3}},'table',null,'split-required'],
 ['complete screenshot',{id:'a',intent:'screenshot',visuals:1},'split-visual','contain','ready'],
 ['missing real photo',{id:'a',intent:'photo',visuals:0},'executive-summary',null,'needs-evidence'],
 ['layered ownership',{id:'a',intent:'architecture',items:3},'architecture',null,'ready'],
 ['roadmap capacity',{id:'a',intent:'roadmap',items:5},'roadmap',null,'split-required'],
 ['unsupported distribution honest',{id:'a',intent:'distribution',data},'table',null,'custom-required'],
 ['approved brand retained',{id:'a',intent:'conclusion',items:3},'executive-summary',null,'ready'],
];
for(const [name,slide,layout,component,status] of cases)test(name,()=>{const result=planDesign({...base,brand:{approved:name==='approved brand retained',theme:'existing-client-theme'},slides:[slide]});const p=result.pages[0];assert.equal(p.layout,layout);assert.equal(p.component,component);assert.equal(p.status,status);assert(p.reason.length);assert.deepEqual(result.outputs,['pptx']);if(name==='approved brand retained'){assert.equal(result.theme,'existing-client-theme');assert.deepEqual(result.styles,['approved-brand']);}else assert.deepEqual(result.styles,['consulting','data-operations']);});
test('invalid counts and unknown scenarios are explicit',()=>{assert.throws(()=>planDesign({...base,scenario:'random'}));assert.throws(()=>planDesign({...base,slides:[{id:'a',intent:'trend',data:{...data,labels:-1}}]}));});
