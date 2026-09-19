/* ============ GitHub Pages 一键部署脚本（无需 git） ============
   用法（cmd）：
     set "GH_TOKEN=ghp_你的令牌" && node deploy.mjs
   做的事：建公开仓库 magic-house → 上传全部文件 → 开启 Pages → 轮询就绪 */
import fs from 'node:fs';
import path from 'node:path';
import { bumpSw } from './bump-sw.mjs';

const TOKEN = process.env.GH_TOKEN;
const REPO = 'magic-house';
if (!TOKEN) { console.error('缺少 GH_TOKEN 环境变量'); process.exit(1); }

const API = 'https://api.github.com';
const HDRS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'magic-house-deploy'
};

async function api(method, p, body) {
  const res = await fetch(API + p, {
    method,
    headers: { ...HDRS, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  return { status: res.status, data };
}

/* 收集要上传的文件 */
const ROOT = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const EXCLUDE = new Set(['.chrome-test', '.git', 'node_modules', '.zcode', 'deploy.mjs', 'bump-sw.mjs']);

/* 先把 sw.js 版本按内容推进，否则 iPad 上已安装的老用户会一直吃旧缓存 */
bumpSw();

const files = [];
(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (EXCLUDE.has(name) || /^shot-.*\.png$/.test(name) || name === 'test-dom.txt') continue;
    if (fs.statSync(full).isDirectory()) walk(full);
    else files.push({ rel, full });
  }
})(ROOT);
console.log(`待上传 ${files.length} 个文件`);

/* 1. 身份 */
const me = await api('GET', '/user');
if (me.status !== 200) { console.error('Token 无效：', me.data); process.exit(1); }
const login = me.data.login;
console.log(`GitHub 账号：${login}`);

/* 2. 建仓库（已存在则跳过） */
let cre = await api('POST', '/user/repos', {
  name: REPO, description: '魔法小屋 - 给小朋友的装扮游戏', private: false, auto_init: true
});
if (cre.status === 201) console.log(`仓库 ${login}/${REPO} 已创建`);
else if (cre.status === 422) console.log(`仓库 ${login}/${REPO} 已存在，直接更新`);
else { console.error('建仓失败：', cre.data); process.exit(1); }

/* 3. 逐个上传（带 sha 支持覆盖更新） */
for (const f of files) {
  const content = fs.readFileSync(f.full).toString('base64');
  const get = await api('GET', `/repos/${login}/${REPO}/contents/${encodeURI(f.rel)}?ref=main`);
  const sha = get.status === 200 ? get.data.sha : null;
  let put = await api('PUT', `/repos/${login}/${REPO}/contents/${encodeURI(f.rel)}`, {
    message: `deploy: ${f.rel}`, content, branch: 'main', ...(sha ? { sha } : {})
  });
  if (put.status !== 200 && put.status !== 201) {
    console.error(`上传失败 ${f.rel}: ${put.status}`, put.data);
    process.exit(1);
  }
  console.log(`  ✓ ${f.rel}`);
}

/* 4. 开启 Pages */
const pages = await api('POST', `/repos/${login}/${REPO}/pages`, {
  source: { branch: 'main', path: '/' }
});
if (pages.status === 201) console.log('Pages 已开启');
else if (pages.status === 409) console.log('Pages 已是开启状态');
else console.log('Pages 状态：', pages.status, pages.data && pages.data.message);

/* 5. 轮询部署就绪 */
const url = `https://${login}.github.io/${REPO}/`;
console.log(`网址：${url}`);
for (let i = 0; i < 20; i++) {
  await new Promise(r => setTimeout(r, 10000));
  const st = await api('GET', `/repos/${login}/${REPO}/pages`);
  console.log(`  构建状态：${st.data && st.data.status}`);
  if (st.data && st.data.status === 'built') { console.log('✅ 部署完成！'); process.exit(0); }
}
console.log('⏳ 构建较慢，可稍后直接访问上面的网址');
