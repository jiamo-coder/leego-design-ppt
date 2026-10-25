#!/usr/bin/env node
import path from 'node:path';
import { parseArgs } from './lib.mjs';
import { loadDeck, createScene } from './scene.mjs';
try {
  const deck=await loadDeck(path.resolve(parseArgs(process.argv).input||'deck-spec.json'));
  deck.spec.slides.forEach((s,i)=>createScene(deck,s,i));
  console.log(`Valid deck spec and estimated text bounds: ${deck.spec.slides.length} slides. Visual review still required.`);
} catch(error) { console.error(error.message);process.exitCode=1; }
