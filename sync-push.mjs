/* ============ API 同步推送（绕开 github.com 主站，只走 api.github.com） ============
   场景：国内网络 github.com:443 间歇性连不上，GitHub Desktop / git push 失败时用。
   用法：set "GH_TOKEN=ghp_..." && node sync-push.mjs
   原理：对比远端 git tree 与本地文件的 blob sha，差异文件用 Contents API 增删，
        最后把本地 git 历史对齐到远端（reset origin/main，工作区不动）。 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const TOKEN = process.env.GH_TOKEN;
const REPO_FULL = 'zjwt555/magic-house';
const GIT = 'C:\\Users\\WT\\AppData\\Local\\GitHubDesktop\\app-3.6.5\\resources\\app\\git\\cmd\\git.exe';
const ROOT = 'C:\\DSH\\magic-house';
if (!TOKEN) { console.error('缺少 GH_TOKEN'); process.exit(1); }

const HDRS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'magic-house-sync'
};
async function api(method, p, body) {
  const res = await fetch('https://api.github.com' + p, {
    method, headers: { ...HDRS, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}
const git = (...args) => execFileSync(GIT, args, { cwd: ROOT, encoding: 'utf8' }).trim();

/* 1. 远端文件清单 */
const treeRes = await api('GET', `/repos/${REPO_FULL}/git/trees/main?recursive=1`);
if (treeRes.status !== 200) { console.error('取远端 tree 失败：', treeRes.data); process.exit(1); }
const remote = new Map(treeRes.data.tree.filter(t => t.type === 'blob').map(t => [t.path, t.sha]));

/* 2. 本地文件清单（git 跟踪的，已尊重 .gitignore） */
const localPaths = git('ls-files').split('\n').filter(Boolean);
const local = new Map();
for (const p of localPaths) {
  local.set(p.replace(/\//g, '/'), git('hash-object', path.join(ROOT, p)));
}

/* 3. 差异同步 */
let changed = 0;
for (const [p, sha] of local) {
  if (remote.get(p) === sha) continue;
  const content = fs.readFileSync(path.join(ROOT, p)).toString('base64');
  const shaArg = remote.has(p) ? { sha: remote.get(p) } : {};
  const put = await api('PUT', `/repos/${REPO_FULL}/contents/${encodeURI(p)}`,
    { message: `sync: ${p}`, content, branch: 'main', ...shaArg });
  if (put.status !== 200 && put.status !== 201) { console.error(`推送失败 ${p}:`, put.data); process.exit(1); }
  console.log(`  ↑ 更新 ${p}`);
  changed++;
}
const toDelete = [...remote.keys()].filter(p => !local.has(p));
let di = 0;
async function deleteWorker() {
  while (di < toDelete.length) {
    const p = toDelete[di++];
    const del = await api('DELETE', `/repos/${REPO_FULL}/contents/${encodeURI(p)}`,
      { message: `sync: 删除 ${p}`, sha: remote.get(p), branch: 'main' });
    if (del.status !== 200) { console.error(`删除失败 ${p}:`, del.status, del.data && del.data.message); process.exit(1); }
    console.log(`  ✂ 删除 ${p}`);
    changed++;
  }
}
await Promise.all(Array.from({ length: Math.min(8, toDelete.length) }, deleteWorker));
if (!changed) console.log('远端已与本地一致，无需推送');

/* 4. 本地 git 对齐远端新历史（工作区不动；github.com 不通时跳过，下次网络恢复再对齐） */
try {
  git('fetch', 'origin', 'main');
  git('reset', 'origin/main');
  console.log('✅ 同步完成，本地 git 已对齐远端');
} catch (e) {
  console.log('✅ 远端已同步。本地对齐跳过（github.com 暂时不通，网络恢复后跑 git fetch && git reset origin/main 即可）');
}
