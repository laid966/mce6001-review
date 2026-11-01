// build.mjs - 生成单文件离线复习网页
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const EXAM_DATE = "2026-11-06";

// ---------- KaTeX CSS with embedded woff2 fonts ----------
function katexCssInline() {
  const dist = path.join(root, "node_modules", "katex", "dist");
  let css = fs.readFileSync(path.join(dist, "katex.min.css"), "utf8");
  const fontsDir = path.join(dist, "fonts");
  // keep only woff2 sources, inline as data URI
  css = css.replace(/url\(fonts\/([^)]+?)\.(woff2|woff|ttf)\)/g, (m, name, ext) => {
    if (ext !== "woff2") return m;
    const buf = fs.readFileSync(path.join(fontsDir, name + ".woff2"));
    return "url(data:font/woff2;base64," + buf.toString("base64") + ")";
  });
  // drop non-woff2 url() alternatives inside src lists
  css = css.replace(/src:\s*([^;}]+)/g, (m, srcList) => {
    const parts = srcList.split(",");
    const w2 = parts.filter(p => p.includes("data:font/woff2"));
    return "src:" + (w2.length ? w2.join(",") : srcList);
  });
  return css;
}

// ---------- markdown subset renderer ----------
function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

function renderTex(tex, disp) {
  try { return katex.renderToString(tex, { displayMode: disp, throwOnError: false, output: "html" }); }
  catch (e) { return "<code>" + esc(tex) + "</code>"; }
}

function inline(s) {
  const maths = [];
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => { maths.push({ tex, disp: true }); return "\u0000" + (maths.length - 1) + "\u0000"; });
  s = s.replace(/\$([^\$\n]+?)\$/g, (m, tex) => { maths.push({ tex, disp: false }); return "\u0000" + (maths.length - 1) + "\u0000"; });
  s = esc(s);
  s = s.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/`([^`]+?)`/g, "<code>$1</code>");
  s = s.replace(/\u0000(\d+)\u0000/g, (m, i) => renderTex(maths[+i].tex, maths[+i].disp));
  return s;
}

function mdBlocks(lines) {
  const out = [];
  let para = [], list = null, quote = [];
  const flushPara = () => { if (para.length) { out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } };
  const flushList = () => { if (list) { out.push("<" + list.tag + ">" + list.items.map(i => "<li>" + inline(i) + "</li>").join("") + "</" + list.tag + ">"); list = null; } };
  const flushQuote = () => { if (quote.length) { out.push("<div class=\"callout\">" + mdBlocks(quote).join("") + "</div>"); quote = []; } };
  const flushAll = () => { flushPara(); flushList(); flushQuote(); };
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) { flushAll(); continue; }
    if (t.startsWith("$$")) { flushAll(); out.push(renderTex(t.replace(/^\$\$/, "").replace(/\$\$$/, ""), true)); continue; }
    if (t.startsWith("|")) {
      flushAll();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { rows.push(lines[i].trim()); i++; }
      i--;
      const parse = r => r.replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
      const isSep = r => parse(r).every(c => /^:?-{2,}:?$/.test(c));
      const head = parse(rows[0]);
      const body = rows.slice(1).filter(r => !isSep(r)).map(parse);
      out.push("<table><thead><tr>" + head.map(c => "<th>" + inline(c) + "</th>").join("") + "</tr></thead><tbody>" + body.map(r => "<tr>" + r.map(c => "<td>" + inline(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table>");
      continue;
    }
    if (t.startsWith("> ")) { flushPara(); flushList(); quote.push(t.slice(2)); continue; }
    if (/^- /.test(t)) { flushPara(); flushQuote(); if (!list || list.tag !== "ul") { flushList(); list = { tag: "ul", items: [] }; } list.items.push(t.slice(2)); continue; }
    if (/^\d+\.\s/.test(t)) { flushPara(); flushQuote(); if (!list || list.tag !== "ol") { flushList(); list = { tag: "ol", items: [] }; } list.items.push(t.replace(/^\d+\.\s/, "")); continue; }
    if (t.startsWith("#### ")) { flushAll(); out.push("<h5>" + inline(t.slice(5)) + "</h5>"); continue; }
    if (t.startsWith("### ")) { flushAll(); out.push("<h4>" + inline(t.slice(4)) + "</h4>"); continue; }
    if (t.startsWith("## ")) { flushAll(); out.push("<h3>" + inline(t.slice(3)) + "</h3>"); continue; }
    flushList(); flushQuote(); para.push(t);
  }
  flushAll();
  return out;
}

function renderMd(text) { return mdBlocks(text.split("\n")).join("\n"); }

// ---------- content loaders ----------
function readIfExists(p) { return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null; }

function parseHw(md, hwId) {
  const lines = md.split("\n");
  const hw = { id: hwId, title: "", meta: "", problems: [] };
  let cur = null, sec = null;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("# ")) { hw.title = t.slice(2); continue; }
    if (t.startsWith("<meta>")) { hw.meta = t.slice(6, -6); continue; }
    if (t.startsWith("## ")) {
      const parts = t.slice(3).split("|").map(s => s.trim());
      cur = { no: parts[0], title: parts[1] || "", pts: parts[2] || "", tags: [], stmt: [], sol: [], take: [] };
      hw.problems.push(cur); sec = null; continue;
    }
    if (!cur) continue;
    if (t.startsWith("<tags>")) { cur.tags = t.slice(6, -6).split(",").map(s => s.trim()).filter(Boolean); continue; }
    if (t.startsWith("### ")) { sec = t.includes("题目") ? "stmt" : t.includes("解答") ? "sol" : t.includes("考点") ? "take" : null; continue; }
    if (sec) cur[sec].push(line);
  }
  return hw;
}

function parseSummary(md) {
  // split on "# " into parts
  const parts = [];
  let cur = null;
  for (const line of md.split("\n")) {
    if (line.startsWith("# ")) { cur = { title: line.slice(2).trim(), body: [] }; parts.push(cur); continue; }
    if (cur) cur.body.push(line);
  }
  return parts;
}

// ---------- assemble ----------
const hw1 = parseHw(readIfExists(path.join(root, "content", "hw1.md")) || "# Assignment 1\n", "hw1");
const hw2 = parseHw(readIfExists(path.join(root, "content", "hw2.md")) || "# Assignment 2\n", "hw2");
const sumFiles = ["summary_part12.md", "summary_part3.md", "summary_part4.md"];
const summaries = [];
for (const f of sumFiles) {
  const txt = readIfExists(path.join(root, "..", "_content", f));
  if (txt) summaries.push(...parseSummary(txt));
}
const overview = readIfExists(path.join(root, "content", "overview.md"));
const cheat = readIfExists(path.join(root, "content", "cheatsheet.md"));

function problemHtml(hw, p) {
  const id = hw.id + "-" + p.no.replace(/[^A-Za-z0-9]/g, "");
  const tags = p.tags.map(t => "<span class=\"tag\">" + esc(t) + "</span>").join("");
  return `<article class="problem" id="${id}" data-search="">
<header class="phead"><span class="pno">${esc(p.no)}</span><h3>${inline(p.title)}</h3><span class="pts">${esc(p.pts)}</span></header>
<div class="tags">${tags}</div>
<section class="stmt"><h4>📄 题目</h4>${renderMd(p.stmt.join("\n"))}</section>
<details class="sol"><summary>✍️ 点击查看答案与解析</summary>${renderMd(p.sol.join("\n"))}</details>
<section class="take"><h4>🎯 考点与套路</h4>${renderMd(p.take.join("\n"))}</section>
</article>`;
}

function hwSectionHtml(hw) {
  return `<section class="hw" id="${hw.id}">
<h2 class="hwtitle">${esc(hw.title)}</h2>
<p class="meta">${esc(hw.meta)}</p>
${hw.problems.map(p => problemHtml(hw, p)).join("\n")}
</section>`;
}

function summarySectionHtml(part, idx) {
  const sid = "sum" + idx;
  return `<section class="sumpart" id="${sid}">
<h2 class="hwtitle">${inline(part.title)}</h2>
${renderMd(part.body.join("\n"))}
</section>`;
}

const navItems = [
  ["overview", "🗺️ 题型地图"],
  ["hw1", "作业 1"],
  ["hw2", "作业 2"],
  ["cheat", "公式速查"],
];
summaries.forEach((s, i) => navItems.push(["sum" + i, "📘 " + s.title.replace(/^Part \d+\s*-\s*/, "P" + (s.title.match(/^Part (\d+)/)?.[1] ?? "") + " ")]));

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>MCE6001 随机过程 · 期末复习</title>
<style>${katexCssInline()}</style>
<style>
:root{--bg:#f7f8fa;--card:#fff;--ink:#1c2330;--mut:#5b6472;--acc:#2563eb;--acc2:#7c3aed;--line:#e3e7ee;--tagbg:#eef2ff;--tagink:#3730a3;--ok:#059669;--warn:#b45309;--code:#f1f5f9}
[data-theme=dark]{--bg:#0f1420;--card:#171e2e;--ink:#e6eaf2;--mut:#9aa4b5;--acc:#60a5fa;--acc2:#a78bfa;--line:#2a3348;--tagbg:#1e2a4a;--tagink:#bfdbfe;--code:#1e2637}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;background:var(--bg);color:var(--ink);line-height:1.75;-webkit-text-size-adjust:100%}
header.top{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--card) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topin{max-width:1080px;margin:0 auto;padding:10px 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.brand{font-weight:800;font-size:17px;letter-spacing:.3px}
.brand small{color:var(--mut);font-weight:500;margin-left:8px}
.spacer{flex:1}
nav.tabs{max-width:1080px;margin:0 auto;padding:0 12px 8px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}
nav.tabs::-webkit-scrollbar{display:none}
nav.tabs a{white-space:nowrap;text-decoration:none;color:var(--mut);font-size:13.5px;padding:5px 11px;border-radius:999px;border:1px solid transparent}
nav.tabs a.on,nav.tabs a:hover{color:var(--acc);background:var(--tagbg);border-color:var(--line)}
main{max-width:1080px;margin:0 auto;padding:18px 16px 90px}
h1.hero{font-size:clamp(22px,4.6vw,34px);margin:14px 0 6px;line-height:1.3}
.hero .sub{color:var(--mut);font-size:14.5px}
.countdown{display:inline-flex;gap:8px;align-items:center;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff;border-radius:12px;padding:8px 14px;font-weight:700;font-size:15px;margin:10px 0}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px 18px;margin:16px 0;box-shadow:0 1px 2px rgb(0 0 0/.04)}
.problem{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 16px;margin:18px 0;box-shadow:0 1px 3px rgb(0 0 0/.05)}
.phead{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.pno{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff;font-weight:800;border-radius:8px;padding:2px 10px;font-size:14px}
.phead h3{margin:0;font-size:17px;flex:1;min-width:200px}
.pts{color:var(--warn);font-weight:700;font-size:13px}
.tags{margin:8px 0 4px;display:flex;flex-wrap:wrap;gap:6px}
.tag{background:var(--tagbg);color:var(--tagink);font-size:12px;border-radius:999px;padding:2px 10px}
section.stmt,section.take{margin:10px 0}
section h4,.sumpart h3{color:var(--acc);font-size:15px;margin:14px 0 6px}
details.sol{margin:10px 0;border:1px dashed var(--line);border-radius:12px;background:color-mix(in srgb,var(--card) 60%,var(--tagbg))}
details.sol>summary{cursor:pointer;padding:10px 14px;font-weight:700;color:var(--acc2);user-select:none;list-style:none}
details.sol>summary::-webkit-details-marker{display:none}
details.sol>summary:before{content:"▸ ";transition:.2s}
details.sol[open]>summary:before{content:"▾ "}
details.sol .inner{padding:0 14px 12px}
.callout{border-left:4px solid var(--acc);background:var(--tagbg);border-radius:0 10px 10px 0;padding:8px 14px;margin:10px 0;color:var(--ink)}
.katex-display{overflow-x:auto;overflow-y:hidden;padding:6px 2px;scrollbar-width:thin}
table{border-collapse:collapse;width:100%;font-size:14px;margin:10px 0;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:7px 10px;text-align:left;vertical-align:top}
th{background:var(--tagbg)}
code{background:var(--code);border-radius:6px;padding:1px 6px;font-size:.92em}
.btn{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:6px 13px;font-size:13px;cursor:pointer}
.btn:hover{border-color:var(--acc);color:var(--acc)}
input.search{border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:999px;padding:7px 14px;font-size:14px;min-width:150px;outline:none}
input.search:focus{border-color:var(--acc)}
.sumpart h2{border-bottom:2px solid var(--acc);padding-bottom:6px}
.sumpart h3{color:var(--acc2)}
.hidden{display:none!important}
footer{color:var(--mut);font-size:12.5px;text-align:center;padding:26px 0 40px}
@media print{header.top,nav.tabs,.no-print{display:none!important}.card,.problem{box-shadow:none;break-inside:avoid}details.sol{open:true}}
@media (max-width:640px){.topin{padding:8px 10px}.brand small{display:none}main{padding:12px 10px 70px}.problem,.card{padding:13px 12px;border-radius:13px}}
</style>
</head>
<body>
<header class="top"><div class="topin">
<div class="brand">MCE6001 随机过程<small>期末复习 · Fall 26 · Zitan Chen</small></div>
<div class="spacer"></div>
<input class="search no-print" id="q" type="search" placeholder="🔍 搜索考点 / 题目…" autocomplete="off">
<button class="btn no-print" id="expand">展开全部</button>
<button class="btn no-print" id="collapse">折叠全部</button>
<button class="btn no-print" id="theme"></button>
</div>
<nav class="tabs no-print" id="tabs">${navItems.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("")}</nav>
</header>
<main>
<h1 class="hero">随机过程期末复习一站通</h1>
<p class="sub">课件考点 × 作业全题全解 × 题型套路 · 单文件离线网页，电脑 / iPad / 手机均可用</p>
<div class="countdown" id="cd">⏳</div>
<section id="overview" class="card">${overview ? renderMd(overview) : "<p>概览待生成</p>"}</section>
${hwSectionHtml(hw1)}
${hwSectionHtml(hw2)}
<section id="cheat" class="card">${cheat ? renderMd(cheat) : "<p>速查表待生成</p>"}</section>
${summaries.map((s, i) => summarySectionHtml(s, i)).join("\n")}
${summaries.length ? "" : "<section class=card><p>📘 课件总结正在生成中……请重新构建。</p></section>"}
</main>
<footer>MCE6001 Random Processes · Fall 26 · 本页面为单文件离线网页，可整体保存 / 打印 · 由 DeepSeek Harness 协助整理</footer>
<script>
const EXAM = new Date(${JSON.stringify(EXAM_DATE)} + "T09:00:00+08:00");
function tick(){const n=new Date();let d=Math.ceil((EXAM-n)/864e5);const el=document.getElementById("cd");if(d<0){el.textContent="考试已结束";return}el.textContent="⏳ 距考试（"+(EXAM.getMonth()+1)+"月"+EXAM.getDate()+"日 周五）还有 "+d+" 天";}
tick();setInterval(tick,6e4);
const th=localStorage.getItem("mce6001-theme");if(th==="dark"){document.documentElement.dataset.theme="dark"}
document.getElementById("theme").onclick=()=>{const d=document.documentElement.dataset.theme==="dark";document.documentElement.dataset.theme=d?"":"dark";localStorage.setItem("mce6001-theme",d?"":"dark");document.getElementById("theme").textContent=d?"🌙":"☀️"};
if(document.documentElement.dataset.theme==="dark")document.getElementById("theme").textContent="☀️";
document.getElementById("expand").onclick=()=>document.querySelectorAll("details.sol").forEach(d=>d.open=true);
document.getElementById("collapse").onclick=()=>document.querySelectorAll("details.sol").forEach(d=>d.open=false);
document.querySelectorAll("details.sol").forEach(d=>{const w=document.createElement("div");w.className="inner";while(d.childNodes.length>1)w.appendChild(d.childNodes[1]);d.appendChild(w)});
const q=document.getElementById("q");
q.oninput=()=>{const s=q.value.trim().toLowerCase();document.querySelectorAll(".problem,.sumpart h3,.sumpart p,.sumpart li").forEach(el=>{if(el.classList.contains("problem")){const hit=!s||el.textContent.toLowerCase().includes(s);el.classList.toggle("hidden",!hit)}});};
const tabs=document.querySelectorAll("nav.tabs a");
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const id=e.target.id;tabs.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+id))}})},{rootMargin:"-40% 0px -55% 0px"});
document.querySelectorAll("main section[id],main .hw[id],main .sumpart[id]").forEach(s=>obs.observe(s));
</script>
</body>
</html>`;

fs.writeFileSync(path.join(root, "index.html"), html);
console.log("index.html written:", (html.length / 1024).toFixed(0) + " KB", "| problems:", hw1.problems.length + hw2.problems.length, "| summary parts:", summaries.length);