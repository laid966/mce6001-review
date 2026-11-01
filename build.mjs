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

const DQ = "$$";
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
    if (t.startsWith(DQ)) {
      flushAll();
      let tex;
      if (t.length > 4 && t.endsWith(DQ)) { tex = t.slice(2, -2); }
      else {
        tex = t.slice(2);
        i++;
        while (i < lines.length && !lines[i].trim().endsWith(DQ)) { tex += "\n" + lines[i].trim(); i++; }
        if (i < lines.length) { const last = lines[i].trim(); tex += "\n" + (last === DQ ? "" : last.slice(0, -2)); }
      }
      out.push(renderTex(tex, true));
      continue;
    }
    if (t.startsWith("|")) {
      flushAll();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { rows.push(lines[i].trim()); i++; }
      i--;
      const parse = r => {
        const s = r.replace(/^\|/, "").replace(/\|$/, "");
        const cells = []; let cur = "", inMath = false;
        for (let k = 0; k < s.length; k++) {
          const ch = s[k];
          if (ch === "$") inMath = !inMath;
          if (ch === "|" && !inMath) { cells.push(cur.trim()); cur = ""; continue; }
          cur += ch;
        }
        cells.push(cur.trim());
        return cells;
      };
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

function renderMd(text) { return mdBlocks(text.split("\n")).join("\n").replace(/<table>/g, "<div class=\"tablewrap\"><table>").replace(/<\/table>/g, "</table></div>"); }

// ---------- content loaders ----------
function readIfExists(p) { return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null; }

function parseHw(md, hwId) {
  const lines = md.split("\n");
  const hw = { id: hwId, title: "", meta: "", problems: [] };
  let cur = null, sec = null;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("# ")) { hw.title = t.slice(2); continue; }
    if (t.startsWith("<meta>")) { hw.meta = t.replace(/^<meta>/, "").replace(/<\/meta>$/, "").trim(); continue; }
    if (t.startsWith("## ")) {
      const body = t.slice(3);
      const fi = body.indexOf("|"), li = body.lastIndexOf("|");
      const parts = fi === -1 ? [body, "", ""] : [body.slice(0, fi).trim(), body.slice(fi + 1, li === fi ? undefined : li).trim(), body.slice(li + 1).trim()];
      cur = { no: parts[0], title: parts[1] || "", pts: parts[2] || "", tags: [], stmt: [], sol: [], take: [] };
      hw.problems.push(cur); sec = null; continue;
    }
    if (!cur) continue;
    if (t.startsWith("<tags>")) { cur.tags = t.replace(/^<tags>/, "").replace(/<\/tags>$/, "").split(",").map(s => s.trim()).filter(Boolean); continue; }
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
  return `<article class="problem" id="${id}">
<div class="phead"><span class="pno">${esc(p.no)}</span><h3>${inline(p.title)}</h3>${p.pts ? `<span class="pts">${esc(p.pts)}</span>` : ""}</div>
${tags ? `<div class="tags">${tags}</div>` : ""}
<div class="plabel">题目</div>
<div class="stmt prose">${renderMd(p.stmt.join("\n"))}</div>
<details class="sol"><summary><span class="chev"></span>点击查看答案与解析</summary><div class="solbody prose">${renderMd(p.sol.join("\n"))}</div></details>
<div class="take"><div class="plabel acc">考点与套路</div>${renderMd(p.take.join("\n"))}</div>
</article>`;
}

function hwSectionHtml(hw, overline) {
  return `<section class="block" id="${hw.id}">
<div class="block-head"><span class="overline">${overline}</span><h2>${esc(hw.title)}</h2>${hw.meta ? `<p class="block-sub">${esc(hw.meta)}</p>` : ""}</div>
${hw.problems.map(pp => problemHtml(hw, pp)).join("\n")}
</section>`;
}

function summarySectionHtml(part, idx) {
  const no = (part.title.match(/Part (\d+)/) || [])[1] || "";
  const short = part.title.replace(/^Part \d+\s*-\s*/, "");
  return `<section class="block" id="sum${idx}">
<div class="block-head"><span class="overline">课件总结 · Part ${no}</span><h2>${inline(short)}</h2></div>
<div class="panel prose">${renderMd(part.body.join("\n"))}</div>
</section>`;
}

const navItems = [
  ["overview", "题型地图"],
  ["hw1", "作业 1"],
  ["hw2", "作业 2"],
  ["cheat", "公式速查"],
];
summaries.forEach((s, i) => navItems.push(["sum" + i, "Part " + ((s.title.match(/Part (\d+)/) || [])[1] || "") + " 总结"]));

const hero = `<section class="hero" id="hero">
<span class="pill">MCE6001 · Random Processes · Fall 26</span>
<h1>随机过程期末复习<br><span class="grad">考点 · 题解 · 套路 一站通</span></h1>
<p class="sub">课件考点总结 × 作业全题全解 × 题型套路 × 公式速查<br>单文件离线网页 · 电脑 / iPad / 手机均可用 · 支持打印与深色模式</p>
<div class="hero-meta">
<span class="chip hot" id="cd">⏳</span>
<span class="chip">👨🏫 Instructor Zitan Chen</span>
<span class="chip">📝 作业 10 题全解</span>
<span class="chip">📘 课件 4 章总结</span>
</div>
</section>`;

const body = [
  hero,
  `<section class="block" id="overview"><div class="block-head"><span class="overline">Overview</span><h2>题型地图与复习路线</h2></div><div class="panel prose">${overview ? renderMd(overview) : "<p>概览待生成</p>"}</div></section>`,
  hwSectionHtml(hw1, "Homework 01"),
  hwSectionHtml(hw2, "Homework 02"),
  `<section class="block" id="cheat"><div class="block-head"><span class="overline">Cheatsheet</span><h2>公式速查表</h2></div><div class="panel prose">${cheat ? renderMd(cheat) : "<p>速查表待生成</p>"}</div></section>`,
  summaries.map((s, i) => summarySectionHtml(s, i)).join("\n"),
].join("\n");

const tpl = fs.readFileSync(path.join(root, "template.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const nav = navItems.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("");
const html = tpl
  .replace("{{KATEX_CSS}}", () => katexCssInline())
  .replace("{{CSS}}", () => css)
  .replace("{{NAV}}", () => nav)
  .replace("{{BODY}}", () => body)
  .replace("{{EXAM_DATE_JSON}}", () => JSON.stringify(EXAM_DATE));

fs.writeFileSync(path.join(root, "index.html"), html);
console.log("index.html written:", (html.length / 1024).toFixed(0) + " KB", "| problems:", hw1.problems.length + hw2.problems.length, "| summary parts:", summaries.length);
