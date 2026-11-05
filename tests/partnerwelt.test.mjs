import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

const path='bundles/partnerwelt-2026-11-05.tar.gz.base64';
const sha='80cea8d2fcd53374cc0d3fa472604432bccecdaffca6c120e3f90b35fe591b29';
function archivedFiles(){
 const compressed=Buffer.from(readFileSync(path,'utf8').replace(/\s/g,''),'base64');
 assert.equal(createHash('sha256').update(compressed).digest('hex'),sha);
 const buf=gunzipSync(compressed), files=new Map();
 let i=0;
 while(i+512<=buf.length){
  const h=buf.subarray(i,i+512),name=h.toString('utf8',0,100).split('\0')[0];
  if(!name)break;
  const size=parseInt(h.toString('ascii',124,136).replace(/\0/g,'').trim(),8);
  assert.ok(name.startsWith('partnerwelt/')&&!name.includes('..'));
  assert.equal(h[156],48);
  assert.ok(Number.isSafeInteger(size)&&size>=0&&i+512+size<=buf.length);
  files.set(name,buf.subarray(i+512,i+512+size));
  i+=512+Math.ceil(size/512)*512;
 }
 return files;
}

test('Partnerwelt release is intact, self-contained and clearly fictional',()=>{
 const files=archivedFiles();assert.equal(files.size,27);
 for(const name of ['index.html','palettenpalaver/index.html','belegballett/index.html','warteschleifenwunder/index.html']){
  const html=files.get('partnerwelt/'+name)?.toString('utf8');
  assert.ok(html, 'missing '+name);
  assert.match(html,/KI-generierte|KI-generiertes/);
  assert.match(html,/Fiktiv|fiktiv/);
  assert.match(html,/name="robots" content="index,follow"|content="index,follow" name="robots"/);
  for(const href of html.matchAll(/href="(https?:\/\/[^"]+)"/g))
   assert.ok(href[1].startsWith('https://folgenreich.benjamin-lam.de/'), 'unexpected external link: '+href[1]);
 }
 for(const company of ['palettenpalaver','belegballett','warteschleifenwunder']){
  const bytes=files.get('partnerwelt/assets/teams/'+company+'.webp');
  assert.ok(bytes?.length>1000);
  assert.equal(bytes.toString('ascii',0,4),'RIFF');
 }
});
