// cheat.mjs - 生成一张 A4 双面（2 页）小抄 HTML（用法: node cheat.mjs [fontSizePx]）
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const FS = parseFloat(process.argv[2] || "15");

const src = fs.readFileSync(path.join(root, "build.mjs"), "utf8");
const a = src.indexOf("function katexCssInline");
const b = src.indexOf("// ---------- content loaders");
const fns = new Function("katex", "fs", "path", "root", src.slice(a, b) + "; return { katexCssInline, renderMd, inline, esc };")(katex, fs, path, root);

const md = fs.readFileSync(path.join(root, "content", "cheat_a4.md"), "utf8");
let title = "", meta = "";
const secs = [];
let cur = null;
for (const line of md.split("\n")) {
  if (line.startsWith("# ")) { title = line.slice(2); continue; }
  if (line.startsWith("<meta>")) { meta = line.replace(/^<meta>/, "").replace(/<[/]meta>$/, ""); continue; }
  if (line.startsWith("## ")) { cur = { h: line.slice(3), body: [] }; secs.push(cur); continue; }
  if (cur) cur.body.push(line);
}
const grp = h => h.startsWith("A1-") ? "g1" : h.startsWith("A2-") ? "g2" : h.startsWith("必背") ? "g3" : "g4";

const body = secs.map(s =>
  "<section class=\"q " + grp(s.h) + "\"><h3>" + fns.inline(s.h) + "</h3>" + fns.renderMd(s.body.join("\n")) + "</section>"
).join("\n");

const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${fns.esc(title)}</title>
<style>${fns.katexCssInline()}</style>
<style>
@page { size: A4 portrait; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: "Segoe UI", system-ui, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: ${FS}px; line-height: 1.42; color: #111; padding: 5mm 5mm 4mm; }
header { text-align: center; margin-bottom: 2.2mm; padding-bottom: 1.4mm; border-bottom: 0.5mm solid #111; }
header h1 { font-size: ${FS + 3}px; margin: 0; letter-spacing: .03em; }
header .meta { font-size: ${FS - 1}px; color: #444; margin-top: 0.6mm; }
.cols { column-count: 2; column-gap: 5mm; column-rule: 0.25mm solid #ccc; }
.q { break-inside: auto; margin: 0 0 1.8mm; padding: 1.1mm 1.5mm 1.3mm; border: 0.2mm solid #d8d8d8; border-radius: 1.2mm; background: #fcfcfc; }
.q h3 { font-size: ${FS + 1}px; margin: -1.4mm -1.8mm 1.2mm; padding: 0.7mm 1.8mm; border-radius: 1.2mm 1.2mm 0 0; break-after: avoid; color: #fff; }
.g1 h3 { background: #1d4ed8; }
.g2 h3 { background: #6d28d9; }
.g3 h3 { background: #b45309; }
.g4 h3 { background: #047857; }
.q p { margin: 0.5mm 0; text-align: justify; }
.q strong { background: linear-gradient(transparent 62%, #ffe58a 62%, #ffe58a 96%, transparent 96%); font-weight: 700; }
.q ul { margin: 0.5mm 0; padding-left: 3.6mm; }
.q li { margin: 0.4mm 0; }
.katex { font-size: 1.04em; }
.katex-display { margin: 0.8mm 0; padding: 0; overflow: visible; }
.katex-display > .katex { font-size: 1.04em; }
</style></head>
<body>
<header><h1>${fns.esc(title)}</h1><div class="meta">${fns.esc(meta)}</div></header>
<div class="cols">${body}</div>
</body></html>`;
fs.writeFileSync(path.join(root, "cheat_a4.html"), html);
console.log("cheat_a4.html written, FS =", FS, "| sections:", secs.length);
