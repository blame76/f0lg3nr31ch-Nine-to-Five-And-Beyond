import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,rmSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {gunzipSync} from 'node:zlib';
import {installPartnerweltRedesign} from '../scripts/partnerwelt-redesign.mjs';

test('Warteschleifenwunder redesign preserves fiction/AI labels and renders SLA, status and roles',()=>{
 const encoded=readFileSync('bundles/partnerwelt-2026-11-05.tar.gz.base64','utf8').replace(/\s/g,'');
 const archive=gunzipSync(Buffer.from(encoded,'base64'));
 const files=['partnerwelt/warteschleifenwunder/index.html','partnerwelt/assets/site.css'];
 const tmp=mkdtempSync(join(tmpdir(),'partnerwelt-visual-test-'));
 try{
  let position=0,found=0;
  while(position+512<=archive.length){
   const header=archive.subarray(position,position+512);
   const filename=header.toString('utf8',0,100).split('\0')[0];
   if(!filename) break;
   const size=parseInt(header.toString('ascii',124,136).replace(/\0/g,'').trim(),8);
   assert.ok(Number.isSafeInteger(size) && size>=0);
   if(files.includes(filename)){
    const target=join(tmp,filename);
    mkdirSync(dirname(target),{recursive:true});
    writeFileSync(target,archive.subarray(position+512,position+512+size));
    found++;
   }
   position+=512+Math.ceil(size/512)*512;
  }
  assert.equal(found,2,'required original HTML and CSS are present');
  installPartnerweltRedesign(tmp);
  const html=readFileSync(join(tmp,files[0]),'utf8');
  const css=readFileSync(join(tmp,files[1]),'utf8');
  for(const marker of ['data-editorial="care-redesign-2026-11-05"','sla-clock','signal-board','return-flow','case-contrast','role-matrix','Freitag 20:00','Montag 12:00','Jona Dranbleib','Lene Nachgehakt','Sam Rückmeldung']){
   assert.ok(html.includes(marker),'missing UI marker: '+marker);
  }
  assert.match(html,/KI-generiertes|KI-generierte/);
  assert.match(html,/fiktiv|Fiktiv/);
  assert.match(css,/care-redesign-2026-11-05/);
  assert.doesNotMatch(html,/<script[^>]+src=["']https?:/);
  assert.throws(()=>installPartnerweltRedesign(tmp),/already applied/);
 } finally {
  rmSync(tmp,{recursive:true,force:true});
 }
});