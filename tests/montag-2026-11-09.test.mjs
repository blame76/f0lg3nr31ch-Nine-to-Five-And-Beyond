import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCampaignImage} from '../scripts/social-image.mjs';
const c=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters;
const a=c.find(x=>x.id==='die-ampel'),z=c.find(x=>x.id==='was-davon-zaehlt');
test('Monday continuity and unchanged source texts',()=>{
 assert.equal(c.find(x=>x.id==='der-t-rex-effekt').position,6);
 assert.equal(a.position,7);assert.equal(z.position,8);
 assert.equal(a.source_blob_sha,'d3f06a360c9c0ba53cc2319e9bad638e2df191b4');assert.equal(z.source_blob_sha,'49f247d61ff1c8b8f39cc80e7df22bc93432f28e');
 const am=readFileSync(a.path,'utf8'),zm=readFileSync(z.path,'utf8');
 assert.ok(am.includes('Um elf hatte er einen Termin mit Alex.'));
 assert.ok(am.includes('Um sechzehn Uhr elf rief er Nora noch einmal an.'));
 assert.ok(zm.includes('Um sechzehn Uhr vierunddreißig kam Martins Antwort.'));
 const msg='Reimers ist geklärt. Spreche morgen mit Alex und Service. Bitte Termin einstellen.';
 assert.ok(am.includes(msg));assert.ok(zm.includes(msg));
 assert.ok(zm.trimEnd().endsWith('Er öffnete den Kalender.'));
 assert.equal(a.research.status,'linked');assert.equal(z.research.status,'linked');
});
test('New previews render as 1200x630 PNGs',()=>{
 for(const x of [a,z]){const im=renderCampaignImage(x);assert.equal(im.readUInt32BE(16),1200);assert.equal(im.readUInt32BE(20),630)}
});
