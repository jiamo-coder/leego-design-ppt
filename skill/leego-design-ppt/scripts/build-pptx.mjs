#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, writeFileEnsured } from './lib.mjs';
import { loadDeck, createScene } from './scene.mjs';
let PptxGenJS,imageSize;
try { PptxGenJS=(await import('pptxgenjs')).default;imageSize=(await import('image-size')).imageSize; }
catch { throw new Error('PPTX dependencies missing. In the skill folder run: npm ci --ignore-scripts. Node.js 20+ required; no Codex runtime needed.'); }
const args=parseArgs(process.argv), input=path.resolve(args.input||'deck-spec.json'), output=path.resolve(args.output||'output/deck.pptx');
const deck=await loadDeck(input), pptx=new PptxGenJS();
pptx.defineLayout({name:'LEEGO',width:13.333333,height:7.5});pptx.layout='LEEGO';
pptx.author='Leego Design PPT';pptx.subject=deck.spec.purpose;pptx.title=deck.spec.title;pptx.lang=deck.spec.language;
pptx.theme={headFontFace:deck.font,bodyFontFace:deck.font,lang:deck.spec.language};
const hex=c=>c.replace('#',''), box=o=>({x:o.x/96,y:o.y/96,w:o.w/96,h:o.h/96});
const scenes=deck.spec.slides.map((s,i)=>createScene(deck,s,i));
for(const scene of scenes) {
  const slide=pptx.addSlide();slide.background={color:hex(scene.background)};
  for(const o of scene.objects) {
    if(o.type==='rect')slide.addShape(pptx.ShapeType.rect,{...box(o),line:{color:hex(o.color),transparency:100},fill:{color:hex(o.color)}});
    if(o.type==='text')slide.addText(o.text,{...box(o),fontFace:deck.font,fontSize:o.size*.75,bold:o.weight>=600,color:hex(o.color),margin:0,breakLine:false,valign:'top',paraSpaceAfterPt:0,lineSpacingMultiple:1.0});
    if(o.type==='image') {
      const bytes=await fs.readFile(o.resolved), dim=imageSize(bytes);
      if(!['png','jpg','jpeg'].includes(dim.type))throw new Error(`${scene.id}: use PNG/JPEG for portable PowerPoint image rendering`);
      if(o.minimumWidth && dim.width<o.minimumWidth || o.minimumHeight && dim.height<o.minimumHeight)throw new Error(`${scene.id}: image below declared minimum resolution`);
      if(o.transparentRequired && (dim.type!=='png' || ![4,6].includes(bytes[25]) && !bytes.includes(Buffer.from('tRNS'))))throw new Error(`${scene.id}: transparentRequired needs a PNG with an alpha channel`);
      const mime=dim.type==='png'?'png':'jpeg', data=`image/${mime};base64,${bytes.toString('base64')}`;
      const b=box(o);let sizing;
      if(o.fit==='contain') { const scale=Math.min(b.w/dim.width,b.h/dim.height),w=dim.width*scale,h=dim.height*scale; sizing={x:b.x+(b.w-w)/2,y:b.y+(b.h-h)/2,w,h}; }
      else {
        const aspect=dim.width/dim.height,target=b.w/b.h;
        const cw=aspect>target?target/aspect:1,ch=aspect>target?1:aspect/target;
        const cx=Math.min(1-cw,Math.max(0,o.focalPoint.x-cw/2)),cy=Math.min(1-ch,Math.max(0,o.focalPoint.y-ch/2));
        const w=b.w/cw,h=b.h/ch;sizing={x:b.x,y:b.y,w,h,sizing:{type:'crop',x:cx*w,y:cy*h,w:b.w,h:b.h}};
      }
      slide.addImage({data,...sizing,altText:o.alt});
    }
    if(o.type==='table') {
      const rows=[o.columns.map(text=>({text:String(text),options:{bold:true,color:'FFFFFF',fill:hex(deck.colors.navy)}})),...o.rows.map(r=>r.map(v=>String(v??'未提供')))];
      slide.addTable(rows,{...box(o),fontFace:deck.font,fontSize:17,color:hex(deck.colors.ink),border:{type:'solid',color:hex(deck.colors.line),pt:1},margin:8,rowH:o.h/96/rows.length,colW:Array(o.columns.length).fill(o.w/96/o.columns.length),autoPage:false,fill:hex(deck.colors.paper),valign:'mid'});
    }
    if(o.type==='chart') slide.addChart(o.chartType==='line'?pptx.ChartType.line:pptx.ChartType.bar,o.series.map(s=>({name:s.name,labels:o.labels,values:s.values})),{...box(o),catAxisLabelFontFace:deck.font,valAxisLabelFontFace:deck.font,catAxisLabelFontSize:13,valAxisLabelFontSize:13,showLegend:true,legendPos:'b',legendFontFace:deck.font,legendFontSize:12,showTitle:true,title:`${o.period} · ${o.unit}`,titleFontFace:deck.font,titleFontSize:14,showValue:false,showCatName:false,barDir:'col',chartColors:[hex(deck.colors.purple),hex(deck.colors.success),hex(deck.colors.warning)],showBorder:false,valAxisMinVal:Math.min(0,...o.series.flatMap(s=>s.values))});
  }
  slide.addNotes(scene.notes);
}
await fs.mkdir(path.dirname(output),{recursive:true});
await pptx.writeFile({fileName:output});
await writeFileEnsured(`${output}.report.json`,JSON.stringify({version:'2.1.0',engine:'pptxgenjs',slides:scenes.length,fontRequested:deck.font,fontEmbedded:false,visualReview:'pending',editability:'native text, shapes, tables, charts; separate raster images',scenes},null,2));
console.log(`Built editable PPTX: ${output}. Render and inspect before delivery; requested font must exist on the viewing/export host.`);
