#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { escapeHtml as esc, parseArgs, writeFileEnsured } from './lib.mjs';
import { loadDeck, createScene } from './scene.mjs';
const args=parseArgs(process.argv), input=path.resolve(args.input||'deck-spec.json'), output=path.resolve(args.output||'output/web');
const deck=await loadDeck(input), scenes=deck.spec.slides.map((s,i)=>createScene(deck,s,i));
await fs.mkdir(path.join(output,'assets'),{recursive:true});
function table(columns,rows){return `<table><thead><tr>${columns.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${esc(x??'未提供')}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
function chart(o){
  const min=Math.min(0,...o.series.flatMap(s=>s.values)),max=Math.max(0,...o.series.flatMap(s=>s.values)),range=max-min||1;
  const x0=70,y0=40,cw=980,ch=210,sy=v=>y0+ch-(v-min)/range*ch,dx=cw/o.labels.length;
  const palette=[deck.colors.purple,deck.colors.success,deck.colors.warning];
  let marks=`<line x1="${x0}" y1="${sy(0)}" x2="${x0+cw}" y2="${sy(0)}" stroke="#69708A"/>`;
  for(let t=0;t<=4;t++){let v=min+range*t/4;marks+=`<text x="60" y="${sy(v)+5}" text-anchor="end" font-size="15">${Number(v.toFixed(2))}</text>`;}
  o.labels.forEach((label,i)=>{marks+=`<text x="${x0+(i+.5)*dx}" y="275" text-anchor="middle" font-size="16">${esc(label)}</text>`;});
  o.series.forEach((s,j)=>{
    if(o.chartType==='line')marks+=`<polyline points="${s.values.map((v,i)=>`${x0+(i+.5)*dx},${sy(v)}`).join(' ')}" fill="none" stroke="${palette[j]}" stroke-width="3"/>`;
    else s.values.forEach((v,i)=>{const bw=dx*.7/o.series.length;marks+=`<rect x="${x0+i*dx+dx*.15+j*bw}" y="${Math.min(sy(v),sy(0))}" width="${bw-3}" height="${Math.abs(sy(v)-sy(0))}" fill="${palette[j]}"/>`;});
    marks+=`<text x="${x0+j*300}" y="310" fill="${palette[j]}" font-size="18">${esc(s.name)}</text>`;
  });
  return `<div class="chart-label">${esc(o.period)} · ${esc(o.unit)}</div><svg viewBox="0 0 1136 330" role="img" aria-label="${esc(o.period+' '+o.unit)}">${marks}</svg><div class="sr-only">${table(['类别',...o.series.map(s=>s.name)],o.labels.map((l,i)=>[l,...o.series.map(s=>s.values[i])]))}</div>`;
}
async function object(o,i,j){
  const style=`left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;`;
  if(o.type==='rect')return `<div aria-hidden="true" class="obj rule" style="${style}background:${o.color}"></div>`;
  if(o.type==='text')return `<div class="obj text ${o.size>=40?'title':''}" style="${style}font-size:${o.size}px;font-weight:${o.weight};color:${o.color}">${esc(o.text)}</div>`;
  if(o.type==='image') {
    const ext=path.extname(o.resolved).toLowerCase();if(!['.png','.jpg','.jpeg'].includes(ext))throw new Error('Use PNG/JPEG image assets for cross-platform output');
    const name=`slide-${i+1}-image-${j}${ext}`;await fs.copyFile(o.resolved,path.join(output,'assets',name));
    return `<img class="obj visual" style="${style}object-fit:${o.fit}" src="assets/${name}" alt="${esc(o.alt)}" ${o.fit==='cover'?`data-focal-x="${o.focalPoint.x}" data-focal-y="${o.focalPoint.y}"`:''}>`;
  }
  return `<div class="obj ${o.type}" style="${style}">${o.type==='table'?table(o.columns,o.rows):chart(o)}</div>`;
}
const sections=[];
for(const [i,s] of scenes.entries())sections.push(`<section class="slide" aria-label="${esc(s.title)}"><div class="canvas" style="background:${s.background}">${(await Promise.all(s.objects.map((o,j)=>object(o,i,j)))).join('')}</div><aside class="notes" hidden><h3>讲稿</h3><p>${esc(s.notes)}</p></aside></section>`);
const html=`<!doctype html><html lang="${esc(deck.spec.language)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(deck.spec.title)}</title><link rel="stylesheet" href="assets/web-runtime.css"><style>body{font-family:${JSON.stringify(deck.font).replace(/</g,'\\3c ')},'Microsoft YaHei','PingFang SC',sans-serif}</style></head><body><main data-deck-id="${esc(deck.spec.title)}">${sections.join('\n')}</main><nav aria-label="演示控制"><button data-action="prev" aria-label="上一页">←</button><span data-counter></span><button data-action="next" aria-label="下一页">→</button><button data-action="overview">总览 O</button><button data-action="notes">讲稿 N</button><button data-action="reading">阅读 R</button></nav><script src="assets/web-runtime.js"></script></body></html>`;
await writeFileEnsured(path.join(output,'index.html'),html);
for(const file of ['web-runtime.css','web-runtime.js'])await fs.copyFile(new URL(`../assets/${file}`,import.meta.url),path.join(output,'assets',file));
console.log(`Built offline HTML: ${path.join(output,'index.html')}`);
