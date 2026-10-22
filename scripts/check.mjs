import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=['index.html',...fs.readdirSync(path.join(root,'pages')).filter(f=>f.endsWith('.html')).map(f=>'pages/'+f)];
assert.equal(files.length,12,'Expected exactly 12 pages');
let links=0;
for(const file of files){const html=fs.readFileSync(path.join(root,file),'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+' must have one h1');assert.ok(html.includes('name="description"'),file+' missing SEO description');assert.ok(html.includes('property="og:title"'));assert.ok(html.includes('id="main"'));assert.ok(html.includes('aria-label="Main navigation"'));
for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(url.startsWith('#')){assert.ok(html.includes('id="'+url.slice(1)+'"'),file+' broken anchor '+url);continue;}if(/^(https?:|data:|mailto:|tel:)/.test(url))continue;assert.ok(!url.startsWith('/'),'Root-absolute path is not GitHub subpath safe: '+url);assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),url)),file+' missing '+url);links++;}
assert.ok(!/href="[^"]*(?:careers|projects|sustainability|news)[^"]*"/.test(html),'Excluded page linked');}
for(const [,url] of fs.readFileSync(path.join(root,'assets/css/site.css'),'utf8').matchAll(/url\(['"]?([^'")]+)['"]?\)/g)){assert.ok(fs.existsSync(path.resolve(root,'assets/css',url)),'Missing CSS asset '+url);}
console.log(`PASS: ${files.length} pages; ${links} local links/assets; metadata, headings, anchors, CSS assets and excluded-page checks.`);
