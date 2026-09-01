#!/usr/bin/env node
import crypto from "node:crypto";
import { parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv);
const manifestUrl = args.manifest || "https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/latest.json";
const allowed = "https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/";
if (!manifestUrl.startsWith(allowed)) throw new Error("Manifest host is not allowlisted");
const response = await fetch(manifestUrl, { signal: AbortSignal.timeout(7000) });
if (!response.ok) throw new Error(`Manifest request failed: ${response.status}`);
const manifest = await response.json();
for (const resource of manifest.resources || []) {
  if (!resource.url.startsWith(allowed)) throw new Error(`Resource host is not allowlisted: ${resource.url}`);
  const bytes = new Uint8Array(await (await fetch(resource.url, { signal: AbortSignal.timeout(7000) })).arrayBuffer());
  const actual = crypto.createHash("sha256").update(bytes).digest("hex");
  if (actual !== resource.sha256) throw new Error(`Hash mismatch: ${resource.id}`);
}
console.log(JSON.stringify({ version: manifest.version, updatedAt: manifest.updatedAt, verifiedResources: manifest.resources?.length || 0 }, null, 2));
