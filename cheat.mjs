// cheat.mjs - 生成单页 A4 小抄 HTML（用法: node cheat.mjs [fontSizePx]）
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const FS = parseFloat(process.argv[2] || "7");

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

const body = secs.map(s =>
  "<section class=\"q\"><h3>" + fns.inline(s.h) + "</h3>" + fns.renderMd(s.body.join("\n")) + "</section>"
).join("\n");

const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${fns.esc(title)}</title>
<style>${fns.katexCssInline()}</style>
<style>
@page { size: A4 portrait; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: "Segoe UI", system-ui, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: ${FS}px; line-height: 1.32; color: #000; padding: 4.5mm 4mm 3mm; }
header { text-align: center; margin-bottom: 1.6mm; }
header h1 { font-size: ${FS + 2.2}px; margin: 0; letter-spacing: .02em; }
header .meta { font-size: ${FS - 0.4}px; color: #333; margin-top: 0.4mm; }
.cols { column-count: 3; column-gap: 2.6mm; column-rule: 0.2mm solid #bbb; }
.q { break-inside: avoid; margin: 0 0 1.5mm; }
.q h3 { font-size: ${FS + 0.7}px; margin: 0 0 0.5mm; padding: 0.3mm 1mm; background: #e8e8e8; border-left: 0.8mm solid #000; break-after: avoid; }
.q p { margin: 0.35mm 0; text-align: justify; }
.katex { font-size: 1.02em; }
.katex-display { margin: 0.6mm 0; padding: 0; overflow: visible; }
.katex-display > .katex { font-size: 1.02em; }
strong { font-weight: 700; }
</style></head>
<body>
<header><h1>${fns.esc(title)}</h1><div class="meta">${fns.esc(meta)}</div></header>
<div class="cols">${body}</div>
</body></html>`;
fs.writeFileSync(path.join(root, "cheat_a4.html"), html);
console.log("cheat_a4.html written, FS =", FS, "| sections:", secs.length);
