// Builds the "public" folder: the only thing Cloudflare publishes.
//   node scripts/publish.js
// It copies the finished pages and the files they use, and adds the Cloudflare settings files.
// Nothing else in the repository (the generator, the design kit, backups) is published.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const copyFile = (rel) => {
  const from = path.join(ROOT, rel);
  if (!fs.existsSync(from)) throw new Error(`publish: missing ${rel}`);
  fs.mkdirSync(path.dirname(path.join(OUT, rel)), { recursive: true });
  fs.copyFileSync(from, path.join(OUT, rel));
};
const copyDir = (rel) => {
  const from = path.join(ROOT, rel);
  if (!fs.existsSync(from)) throw new Error(`publish: missing ${rel}`);
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const r = path.join(rel, e.name);
    if (e.isDirectory()) copyDir(r); else copyFile(r);
  }
};

const PAGES = ['index', 'services', 'work', 'about', 'contact'];
for (const p of PAGES) { copyFile(`${p}.html`); copyFile(path.join('ku', `${p}.html`)); }
copyFile(path.join('assets', 'logo.svg'));
copyDir(path.join('assets', 'img'));
copyDir(path.join('assets', 'enhance'));

fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\n');

// security headers for every page; short cache for the scripts and styles (their names do not change when they are edited)
fs.writeFileSync(path.join(OUT, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/enhance/*
  Cache-Control: public, max-age=3600

/assets/img/*
  Cache-Control: public, max-age=604800
`);

fs.writeFileSync(path.join(OUT, '404.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Page not found | Evolve 360</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #eceff4; color: #0a1a2b; font: 400 18px/1.6 system-ui, sans-serif; text-align: center; padding: 24px; }
  @media (prefers-color-scheme: dark) { body { background: #04060a; color: #e9eff7; } }
  h1 { font-size: 2.4rem; margin: 0 0 12px; }
  a { display: inline-block; margin: 8px 10px; padding: 12px 24px; border-radius: 999px; background: #c2410c; color: #fff; text-decoration: none; font-weight: 600; }
  @media (prefers-color-scheme: dark) { a { background: #ff6a1f; color: #04060a; } }
</style>
</head>
<body>
<main>
  <h1>Page not found</h1>
  <p>This page does not exist. / ئەم پەڕەیە بوونی نییە.</p>
  <a href="/">Evolve 360</a><a href="/ku/" lang="ckb">کوردی</a>
</main>
</body>
</html>
`);

const count = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(d, e.name)) : 1), 0);
console.log(`public/ ready: ${count(OUT)} files`);
