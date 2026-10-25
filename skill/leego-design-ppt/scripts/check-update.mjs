#!/usr/bin/env node
import fs from 'node:fs/promises';
import { parseArgs } from './lib.mjs';
import { syncRules } from './rule-channel.mjs';
const args=parseArgs(process.argv);
const {version}=JSON.parse(await fs.readFile(new URL('../package.json',import.meta.url),'utf8'));
try {
 const result=await syncRules({clientVersion:version,cacheDir:args['cache-dir'],offline:Boolean(args.offline)||process.env.LEEGO_PPT_OFFLINE==='1',pin:args.pin});
 console.log(JSON.stringify(result,null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
