import fs from 'node:fs/promises';
import path from 'node:path';
import { readJson } from './lib.mjs';

export const W = 1280, H = 720;
export const layoutIds = ['cover','executive-summary','timeline','problem-matrix','principles','split-visual','architecture','data-flow','process','dual-screenshot','product-matrix','vi-showcase','comparison','governance','evidence-wall','roadmap','kpi','decision-close','table','chart'];
const flow = new Set(['process','timeline','roadmap','data-flow']);
export async function loadDeck(input) {
  const spec = await readJson(input);
  const errors = [];
  for (const k of ['title','language','audience','purpose','theme']) if (typeof spec[k] !== 'string' || !spec[k].trim()) errors.push(`Missing ${k}`);
  if (spec.schemaVersion !== '2.0') errors.push('schemaVersion must be 2.0');
  if (!spec.brand?.name) errors.push('Missing brand.name');
  if (!Array.isArray(spec.slides) || !spec.slides.length) errors.push('slides must be a nonempty array');
  const ids = new Set();
  for (const [i,s] of (Array.isArray(spec.slides) ? spec.slides : []).entries()) {
    const prefix = s.id || `slide ${i+1}`;
    if (!/^[a-z0-9-]+$/.test(s.id || '') || ids.has(s.id)) errors.push(`${prefix}: invalid/duplicate id`);
    ids.add(s.id);
    if (!s.title || !s.narrativeJob) errors.push(`${prefix}: title and narrativeJob required`);
    if (!layoutIds.includes(s.layout)) errors.push(`${prefix}: unsupported layout ${s.layout}`);
    if ((s.items || []).length > 6) errors.push(`${prefix}: split more than six items across pages`);
    const structured = [!!s.table, !!s.chart, !!s.visuals?.length].filter(Boolean).length;
    if (structured > 1 || ((s.table || s.chart) && s.items?.length)) errors.push(`${prefix}: use separate pages for table, chart, visuals and item collections`);
    if (s.layout === 'cover' && (structured || s.items?.length)) errors.push(`${prefix}: cover supports title/body only; put evidence on a separate slide`);
    if (s.layout === 'table' && !s.table) errors.push(`${prefix}: table required`);
    if (s.layout === 'chart' && !s.chart) errors.push(`${prefix}: chart required`);
    if (['split-visual','dual-screenshot','vi-showcase','evidence-wall'].includes(s.layout) && !s.visuals?.length) errors.push(`${prefix}: visuals required`);
    if (s.table) {
      const t = s.table;
      if (!Array.isArray(t.columns) || t.columns.length < 1 || t.columns.length > 6 || !Array.isArray(t.rows) || t.rows.length > 7 || t.rows.some(r=>!Array.isArray(r) || r.length !== t.columns.length)) errors.push(`${prefix}: table supports up to 6 columns and 7 rows with matching cell counts`);
    }
    if (s.chart) {
      const c = s.chart;
      if (!['bar','line'].includes(c.type) || !c.unit || !c.period || !s.sources?.length) errors.push(`${prefix}: chart needs bar/line type, unit, period and sources`);
      if (!Array.isArray(c.labels) || c.labels.length < 1 || c.labels.length > 8 || !Array.isArray(c.series) || c.series.length < 1 || c.series.length > 3 || c.series.some(x=>!x.name || !Array.isArray(x.values) || x.values.length !== c.labels.length || x.values.some(v=>typeof v !== 'number' || !Number.isFinite(v)))) errors.push(`${prefix}: chart supports 1–8 labels, 1–3 series, matching finite values; do not coerce unknowns to zero`);
    }
    if ((s.visuals || []).length > 4) errors.push(`${prefix}: at most four visuals per page`);
    for (const v of s.visuals || []) {
      if (!['contain','cover'].includes(v.fit)) errors.push(`${prefix}: image fit must be contain or cover`);
      if (!v.alt) errors.push(`${prefix}: image alt required`);
      if (v.fit === 'cover' && (!v.focalPoint || !['x','y'].every(k=>Number.isFinite(v.focalPoint[k]) && v.focalPoint[k]>=0 && v.focalPoint[k]<=1))) errors.push(`${prefix}: cover requires focalPoint x/y in 0..1`);
      if (typeof v.src !== 'string' || /^(https?:|data:)/i.test(v.src)) errors.push(`${prefix}: use a local image asset, relative to deck-spec.json; download authorized assets first`);
      else { v.resolved = path.resolve(path.dirname(input),v.src); try { await fs.access(v.resolved); } catch { errors.push(`${prefix}: image not found ${v.src}`); } }
    }
    const visible = JSON.stringify({title:s.title,body:s.body,items:s.items,notes:s.notes,sources:s.sources,table:s.table,chart:s.chart,visuals:(s.visuals||[]).map(v=>({alt:v.alt,caption:v.caption}))});
    if (/\b(TODO|TBD|lorem ipsum|placeholder)\b/i.test(visible)) errors.push(`${prefix}: unfinished copy`);
    for (const term of spec.bannedTerms || []) if (term && visible.toLowerCase().includes(term.toLowerCase())) errors.push(`${prefix}: banned term ${term}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  const tokens = await readJson(new URL('../assets/design-tokens.json',import.meta.url));
  const themes = await readJson(new URL('../assets/theme-presets.json',import.meta.url));
  const preset = themes.themes.find(t=>t.id===spec.theme);
  if (!preset) throw new Error(`Unknown theme ${spec.theme}`);
  const colors = {...tokens.colors,...preset.overrides,...spec.style?.colors};
  for (const [key,value] of Object.entries(colors)) if (!/^#[\da-f]{6}$/i.test(value)) throw new Error(`Invalid color ${key}`);
  return {spec, colors, font:spec.style?.fontFace || 'MiSans'};
}

export function wrapText(text, width, size) {
  const lines=[];
  for (const paragraph of String(text).split('\n')) {
    let line='', units=0;
    // Keep Latin words intact; Chinese permits breaks between characters.
    for (const token of paragraph.match(/[\x21-\x7e]+|\s|[^\x00-\x7f]/gu) || []) {
      const cost=Array.from(token).reduce((n,ch)=>n+(/[\x00-\x7f]/.test(ch)?0.57:1),0);
      if (cost*size > width) throw new Error('Unbreakable text exceeds its box; shorten it or move the URL into notes');
      if (line && (units+cost)*size > width) { lines.push(line.trimEnd());line='';units=0; }
      if (!line && /^\s+$/.test(token)) continue;
      line+=token;units+=cost;
    }
    lines.push(line.trimEnd());
  }
  for(let i=1;i<lines.length;i++) {
    if(/^[\u3400-\u9fff，。！？、]{1,3}$/.test(lines[i]) && /[\u3400-\u9fff]{4,}$/.test(lines[i-1])) {
      const take=4-lines[i].length;lines[i]=lines[i-1].slice(-take)+lines[i];lines[i-1]=lines[i-1].slice(0,-take);
    }
  }
  return lines.join('\n');
}
export function createScene(deck,s,index) {
  const c=deck.colors, cover=s.layout==='cover', objects=[];
  function text(value,x,y,w,h,size=24,color=c.ink,weight=400) {
    if (value===undefined || value===null || value==='') return;
    const content=wrapText(String(value),w,size);
    if (content.split('\n').length*size*1.32 > h+1) throw new Error(`${s.id}: text does not fit: ${String(value).slice(0,60)}; edit copy or split the slide`);
    objects.push({type:'text',text:content,x,y,w,h,size,color,weight});
  }
  function rect(x,y,w,h,color){objects.push({type:'rect',x,y,w,h,color});}
  if (cover) {
    text(s.eyebrow,72,64,1080,32,18,c.ice,500);
    text(s.title,72,200,1100,200,58,c.white,600);
    text(s.body,72,440,1050,126,26,c.ice);
    rect(72,610,210,6,c.purple);
  } else {
    text(s.eyebrow,72,42,1080,26,16,c.purple,500);
    text(s.title,72,86,1136,120,42,c.ink,600);
    text(s.body,72,215,1136,72,23,c.muted);
    const y=s.body?310:245, h=620-y;
    if (s.table) {
      const rows=[s.table.columns,...s.table.rows],rowH=h/rows.length,cellW=1136/s.table.columns.length-24;
      for(const row of rows) for(const cell of row) if(wrapText(cell??'未提供',cellW,23).split('\n').length*30+20>rowH) throw new Error(`${s.id}: table cell too dense; split rows/columns`);
      objects.push({type:'table',...s.table,x:72,y,w:1136,h});
    }
    else if (s.chart) objects.push({...s.chart,type:'chart',chartType:s.chart.type,x:72,y,w:1136,h});
    else if (s.visuals?.length) {
      const withItems=!!s.items?.length;
      const left=withItems?560:72, width=withItems?648:1136;
      const cols=s.visuals.length>1?2:1, rows=Math.ceil(s.visuals.length/cols);
      for(const [i,v] of s.visuals.entries()) objects.push({type:'image',...v,x:left+(i%cols)*(width/cols+12),y:y+Math.floor(i/cols)*(h/rows+10),w:width/cols-(cols>1?12:0),h:h/rows-(rows>1?10:0)-(v.caption?32:0)});
      for(const o of objects.filter(o=>o.type==='image')) if(o.caption) text(o.caption,o.x,o.y+o.h+6,o.w,26,16,c.muted);
      if (withItems) items(s.items,72,y,440,h,1);
    } else if(s.layout==='architecture') {
      const n=s.items?.length||0, row=h/Math.max(n,1);
      (s.items||[]).forEach((it,i)=>{rect(72,y+i*row,4,row-14,c.purple);text([it.value,it.title].filter(v=>v!==undefined&&v!=='').join(' '),94,y+i*row,270,row-14,25,c.ink,500);text(it.body,390,y+i*row,818,row-14,22,c.muted);});
    } else items(s.items||[],72,y,1136,h,flow.has(s.layout)?Math.min(4,s.items?.length||1):undefined);
    if (s.sources?.length) text(s.sources.join(' | '),72,644,1070,42,12,c.muted);
  }
  text(String(index+1).padStart(2,'0'),1165,671,45,24,14,cover?c.ice:c.muted);
  function items(list,x,y,w,h,forcedCols) {
    const cols=forcedCols||Math.min(list.length||1,list.length<=3?3:2), rows=Math.ceil(list.length/cols), gap=32;
    const cw=(w-gap*(cols-1))/cols, rh=(h-24*(rows-1))/Math.max(rows,1);
    list.forEach((it,i)=>{
      const xx=x+i%cols*(cw+gap), yy=y+Math.floor(i/cols)*(rh+24);
      rect(xx,yy,cw,2,c.purple);
      let offset=16;
      if(it.value!==undefined) { text(String(it.value),xx,yy+offset,cw,54,36,c.purple,600);offset+=60; }
      if(it.title) {text(it.title,xx,yy+offset,cw,64,24,c.ink,500);offset+=70;}
      if(it.body) text(it.body,xx,yy+offset,cw,rh-offset,21,c.muted);
    });
  }
  for(const o of objects) if(o.x<0 || o.y<0 || o.x+o.w>W+1 || o.y+o.h>H+1) throw new Error(`${s.id}: object outside canvas`);
  return {id:s.id,title:s.title,layout:s.layout,background:cover?c.navy:c.paper,objects,notes:[s.notes?.purpose,...s.notes?.talkingPoints||[],s.notes?.transition,...s.sources||[]].filter(Boolean).join('\n')};
}
