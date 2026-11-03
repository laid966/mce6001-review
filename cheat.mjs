// cheat.mjs - 一张 A4 双面小抄（黑白）：p1 = 原题原文扫描 2x2，p2 = 解答与速查三栏
// 用法: node cheat.mjs [fontSizePx]
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const FS = parseFloat(process.argv[2] || "10");

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
let body = secs.map(s =>
  "<section class=\"q\"><h3>" + fns.inline(s.h) + "</h3>" + fns.renderMd(s.body.join("\n")) + "</section>"
).join("\n");
body = body
  .replace(/<strong>记背<\/strong>：/g, '<span class="lb lb1">记背</span>')
  .replace(/<strong>套路<\/strong>：/g, '<span class="lb lb2">套路</span>')
  .replace(/<strong>易错<\/strong>：/g, '<span class="lb lb3">易错</span>');

const img = f => "data:image/jpeg;base64," + fs.readFileSync(path.join(root, "assets", f)).toString("base64");
const solImgs = [
  ["s1_p1.jpg", "作业 1 官方解答 P1"], ["s1_p2.jpg", "作业 1 官方解答 P2"], ["s1_p3.jpg", "作业 1 官方解答 P3"],
  ["s1_p4.jpg", "作业 1 官方解答 P4"], ["s2_p1.jpg", "作业 2 官方解答 P1"], ["s2_p2.jpg", "作业 2 官方解答 P2"],
  ["s2_p3.jpg", "作业 2 官方解答 P3"], ["s2_p4.jpg", "作业 2 官方解答 P4"], ["s2_p5.jpg", "作业 2 官方解答 P5"],
].map(([f, c]) => ({ src: img(f), cap: c }));

const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${fns.esc(title)}</title>
<style>${fns.katexCssInline()}</style>
<style>
@page { size: A4 portrait; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: "Segoe UI", system-ui, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: ${FS}px; line-height: 1.52; color: #000; background: #fff; padding: 4mm 4.5mm 3.5mm; }
.sheet1 { break-after: page; }
.tstrip { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; border-bottom: 0.6mm solid #000; padding-bottom: 1.2mm; margin-bottom: 2.2mm; }
.tstrip h1 { font-size: ${FS + 4}px; margin: 0; letter-spacing: .02em; }
.tstrip .meta { font-size: ${FS - 0.5}px; color: #222; white-space: nowrap; }
.imggrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5mm; }
.imggrid figure { margin: 0; }
.imggrid img { width: 100%; display: block; border: 0.25mm solid #555; filter: grayscale(1) contrast(1.08); }
.imggrid figcaption { font-size: ${FS - 1.5}px; color: #222; text-align: center; margin-top: 0.6mm; }
.cap { font-size: ${FS - 1.5}px; color: #222; margin-top: 1.6mm; border-top: 0.2mm solid #999; padding-top: 1mm; }
.cols { column-count: 2; column-gap: 4.5mm; column-rule: 0.2mm solid #999; }
.q { break-inside: avoid; margin: 0 0 2.4mm; padding: 1.5mm 2mm 1.7mm; border: 0.25mm solid #666; }
.q h3 { font-size: ${FS + 1.3}px; margin: -1.5mm -2mm 1.4mm; padding: 0.8mm 2mm; background: #000; color: #fff; break-after: avoid; letter-spacing: .02em; }
.q p { margin: 0.7mm 0; text-align: left; }
.lb { display: inline-block; font-weight: 700; font-size: .9em; line-height: 1.25; padding: 0.1mm 1.4mm; border-radius: 0.8mm; margin-right: 1.2mm; }
.lb1 { background: #000; color: #fff; }
.lb2 { background: #8a8a8a; color: #fff; }
.lb3 { background: #fff; color: #000; border: 0.22mm solid #000; }
.q strong { font-weight: 700; }
.q ul { margin: 0.6mm 0; padding-left: 3.8mm; }
.q li { margin: 1mm 0; padding-left: 0.4mm; }
.q li::marker { color: #000; }
.tablewrap { border: 0.2mm solid #888; margin: 1mm 0; }
table { width: 100%; border-collapse: collapse; font-size: ${FS - 0.6}px; min-width: 0; }
th, td { border: 0.15mm solid #aaa; padding: 0.4mm 1mm; vertical-align: top; }
th { background: #e6e6e6; }
.katex { font-size: 1.03em; }
.katex-display { margin: 0.7mm 0; padding: 0; overflow: visible; }
.katex-display > .katex { font-size: 1.03em; }
</style></head>
<body>
<div class="sheet1">
  <div class="tstrip"><h1>${fns.esc(title)}</h1><span class="meta">${fns.esc(meta)}</span></div>
  <div class="imggrid">
    ${solImgs.map(o => `<figure><img src="${o.src}"><figcaption>${o.cap}</figcaption></figure>`).join("\n    ")}
  </div>
  <div class="cap">上：两次作业官方解答原文（缩印 3×3）；背面：打字版全解 + 必背速记 + 课件考点附录 + 反例库 + 题型识别 + 基础知识与定理速查。</div>
</div>
<div class="cols">${body}</div>
</body></html>`;
fs.writeFileSync(path.join(root, "cheat_a4.html"), html);
console.log("cheat_a4.html written, FS =", FS, "| sections:", secs.length);
