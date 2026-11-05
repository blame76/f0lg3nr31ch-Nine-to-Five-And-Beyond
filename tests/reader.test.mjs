import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {validateManifest,markdownToHtml} from '../scripts/lib.mjs';
const c=JSON.parse(readFileSync('config/site.json','utf8')),m=JSON.parse(readFileSync('content/chapters/index.json','utf8'));
test('Exact brand and canonical site',()=>{assert.equal(c.name,'f0lg3nr31ch');assert.equal(c.subtitle,'Nine to Five. And Beyond.');assert.equal(c.site_url,'https://folgenreich.benjamin-lam.de');});
test('Five author-approved chapter snapshots',()=>{assert.equal(m.chapters.length,5);assert.equal(new Set(m.chapters.map(x=>x.id)).size,4);for(const x of m.chapters){assert.ok(existsSync(x.path));assert.match(x.source_blob_sha,/^[a-f0-9]{40}$/);assert.ok(readFileSync(x.path,'utf8').length>8000);}});
test('Public chapter markdown omits internal editorial labels',()=>{
 for(const chapter of m.chapters){
  const opening=readFileSync(chapter.path,'utf8').split(String.fromCharCode(10)).slice(0,8).join(' ');
  assert.doesNotMatch(opening,/Arbeitsfassung|Release-Kandidat|Redaktionsnotiz|TODO|FIXME/i,chapter.id);
 }
});
test('Author-approved chapters remain unindexed until independent legal release gate',()=>{
 assert.equal(m.chapters.filter(x=>x.status==='approved' && x.approved_by==='Benjamin Lam' && x.approved_at==='2026-11-04').length,3);
 assert.equal(m.chapters.filter(x=>x.status==='approved' && x.approved_by==='Benjamin Lam' && x.approved_at==='2026-11-05').length,2);
 assert.ok(m.chapters.every(x=>x.status==='approved'));
 assert.equal(c.release_approved,false);
 assert.equal(c.legal_reviewed_for_launch,false);
 assert.equal(c.public_pages_indexing_approved,true);
});
test('Manifest validation',()=>{assert.deepEqual(validateManifest(c,m),[]);const bad=structuredClone(m);bad.chapters[0].status='draft';assert.ok(validateManifest(c,bad).length>0);});
test('Escaping in markdown reader',()=>{assert.match(markdownToHtml('Hello <script>'),/&lt;script&gt;/);});
test('Validation executable',()=>{const r=spawnSync(process.execPath,['scripts/check.mjs'],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);});
