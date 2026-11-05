import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,rmSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {gunzipSync} from 'node:zlib';
import {installPartnerweltRedesign} from '../scripts/partnerwelt-redesign.mjs';
import {installPartnerweltSocial,POSTS,SOCIAL_SLUGS} from '../scripts/partnerwelt-social.mjs';

function extractOriginal(root){
 const encoded=readFileSync('bundles/partnerwelt-2026-11-05.tar.gz.base64','utf8').replace(/\s/g,'');
 const tar=gunzipSync(Buffer.from(encoded,'base64'));
 let i=0,count=0;
 while(i+512<=tar.length){
  const h=tar.subarray(i,i+512),name=h.toString('utf8',0,100).split('\0')[0];if(!name)break;
  const length=parseInt(h.toString('ascii',124,136).replace(/\0/g,'').trim(),8);
  assert.ok(name.startsWith('partnerwelt/')&&!name.includes('..')&&Number.isSafeInteger(length));
  const target=path.join(root,name);mkdirSync(path.dirname(target),{recursive:true});
  writeFileSync(target,tar.subarray(i+512,i+512+length));i+=512+Math.ceil(length/512)*512;count++;
 }
 assert.equal(count,27);
}

test('All six social posts are original, truthfully labeled and thread-sized',()=>{
 assert.equal(POSTS.length,6);assert.equal(new Set(POSTS.map(p=>p.id)).size,6);
 assert.equal(SOCIAL_SLUGS.length,7);
 for(const p of POSTS){
  assert.match(p.text,/fiktiv|Fiktiv/);
  assert.ok(p.text.length<=500,'Threads text too long: '+p.id);
  assert.match(p.image,/\.jpg$/);
  assert.ok(p.hook&&p.proof&&p.cta&&p.why);
 }
});

test('Social-Labor builds from the existing immutable bundle with labeled images and accessible content',()=>{
 const temp=mkdtempSync(path.join(tmpdir(),'partnerwelt-social-test-'));
 try {
  extractOriginal(temp);
  installPartnerweltRedesign(temp);
  const previous=readFileSync(path.join(temp,'partnerwelt','palettenpalaver','index.html'),'utf8');
  installPartnerweltSocial(temp);
  assert.match(readFileSync(path.join(temp,'partnerwelt','palettenpalaver','index.html'),'utf8'),/Social-Labor/);
  assert.ok(readFileSync(path.join(temp,'partnerwelt','palettenpalaver','index.html'),'utf8').includes(previous.slice(0,200)));
  const index=readFileSync(path.join(temp,'partnerwelt','share','index.html'),'utf8');
  assert.match(index,/ROMANEXPERIMENT/);assert.match(index,/KI-unterstützt/);
  assert.match(index,/Web Share API|Teilen nur auf Wunsch/);
  assert.match(index,/og:image/);
  for(const p of POSTS){
   const html=readFileSync(path.join(temp,'partnerwelt','share',p.id,'index.html'),'utf8');
   assert.match(html,/index,follow/);
   assert.ok(html.includes('https://folgenreich.benjamin-lam.de/partnerwelt/share/'+p.id+'/'));
   assert.match(html,/application\/ld\+json/);
   assert.match(html,/data-share-action="share"/);
   assert.match(html,/KI-unterstützt/);
   const img=readFileSync(path.join(temp,'partnerwelt','share','assets','og',p.image));
   assert.ok(img.length>5000,'missing local social preview '+p.id);
   assert.equal(img[0],0xff);assert.equal(img[1],0xd8);
  }
  assert.match(readFileSync(path.join(temp,'partnerwelt','assets','site.css'),'utf8'),/social-lab-contrast-2026-11-05/);
  assert.match(readFileSync(path.join(temp,'partnerwelt','sitemap.xml'),'utf8'),/partnerwelt\/share\/regel-ohne-herkunft/);
  assert.throws(()=>installPartnerweltSocial(temp),/already applied/);
 } finally {rmSync(temp,{recursive:true,force:true});}
});