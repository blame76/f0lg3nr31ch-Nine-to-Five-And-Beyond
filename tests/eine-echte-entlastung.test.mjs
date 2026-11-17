import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {renderCampaignImage} from '../scripts/social-image.mjs';
test('Episode 14 preserves the approved ending and fictional internal documentation',()=>{
 const c=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters.find(x=>x.id==='eine-echte-entlastung');
 assert.equal(c.position,14);assert.equal(c.status,'approved');assert.equal(c.research.status,'none');
 const prose=readFileSync(c.path,'utf8');
 assert.match(prose,/welcher der Kunden sich besonders gut für das Pilotprojekt eignen würde\.\s*$/);
 assert.doesNotMatch(prose,/Auslastungsplanung|Arbeitsfassung/);
 const png=renderCampaignImage(c);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
 assert.ok(png.equals(renderCampaignImage(c)));
 const run=spawnSync(process.execPath,['scripts/build.mjs'],{encoding:'utf8'});assert.equal(run.status,0,run.stderr);
 const html=readFileSync('dist/roman/eine-echte-entlastung/index.html','utf8');
 assert.match(html,/Interne Dokumentation – nur für den internen Gebrauch\./);
 assert.match(html,/24 Türchen\. Ein Roboter\./);
 assert.doesNotMatch(html,/class="research-marker"|class="research-list"|Auslastungsplanung/);
});
