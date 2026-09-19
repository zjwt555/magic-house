/* ============ sw.js 版本自动 bump ============
   为什么需要：sw.js 的 fetch 是 cache-first，浏览器只在 sw.js **字节变化**时才装新
   Service Worker。所以每次改了 js/css 却忘了改 VERSION，iPad 上"添加到主屏幕"的
   老用户就会一直吃旧缓存，看起来像"改了没生效"。

   做法：按 CORE 清单里所有资源的内容算哈希写回 VERSION。
   - 内容没变 → 哈希不变 → 不产生 diff
   - 内容变了 → 版本自动前进 → 老用户下次打开自动换新

   用法：node bump-sw.mjs
        （deploy.mjs / sync-push.mjs 都会自动调用，一般不用手动跑） */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(import.meta.url);
const ROOT = path.dirname(HERE);
const SW = path.join(ROOT, 'sw.js');

export function bumpSw() {
  const src = fs.readFileSync(SW, 'utf8');

  const block = src.match(/const CORE = \[([\s\S]*?)\];/);
  if (!block) { console.error('bump-sw: sw.js 里没找到 CORE 数组'); process.exit(1); }

  /* './' 等价于 index.html；去重后逐个算内容哈希 */
  const entries = [...block[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  const files = [...new Set(entries.map(e => (e === './' ? 'index.html' : e.replace(/^\.\//, ''))))];

  const hash = crypto.createHash('sha1');
  for (const f of [...files].sort()) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) { console.error(`bump-sw: CORE 里的文件不存在 → ${f}`); process.exit(1); }
    hash.update(f);
    hash.update(fs.readFileSync(full));
  }
  const version = 'magic-house-' + hash.digest('hex').slice(0, 10);
  const before = (src.match(/const VERSION = '([^']*)'/) || [])[1];

  if (before === version) {
    console.log(`  sw.js 版本已是最新：${version}`);
  } else {
    fs.writeFileSync(SW, src.replace(/const VERSION = '[^']*';/, `const VERSION = '${version}';`), 'utf8');
    console.log(`  sw.js 版本更新：${before || '(无)'} → ${version}`);
  }

  /* 顺带体检：index.html 引用了但没进 CORE 的文件，离线会白屏 */
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+)"/g)].map(m => m[1]);
  const missing = refs.filter(r => !files.includes(r));
  if (missing.length) {
    console.warn(`  ⚠️ index.html 引用了但不在 sw.js CORE 里（离线会缺文件）：${missing.join(', ')}`);
  }

  return version;
}

if (process.argv[1] && path.resolve(process.argv[1]) === HERE) bumpSw();
