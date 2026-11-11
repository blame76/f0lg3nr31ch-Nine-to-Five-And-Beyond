import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCampaignImage} from '../scripts/social-image.mjs';

const manifest=JSON.parse(readFileSync('content/chapters/index.json','utf8'));
const get=id=>manifest.chapters.find(ch=>ch.id===id);
test('Die zwei Mittwochsfolgen sind separat freigegeben und aufeinanderfolgend',()=>{
  const a=get('die-gleiche-arbeit-nur-schneller'),b=get('die-kleine-delle');
  assert.equal(a.position,10);assert.equal(b.position,11);
  assert.equal(a.status,'approved');assert.equal(b.status,'approved');
  assert.equal(a.approved_at,'2026-11-11');assert.equal(b.approved_at,'2026-11-11');
});
test('Der Cut von Die kleine Delle bleibt letzte Zeile der Erzählung',()=>{
  const text=readFileSync('content/chapters/die-kleine-delle.md','utf8').trim();
  assert.match(text,/Mit diesem Gedanken stieß sein Putzwagen gegen die Wand und hinterließ eine kleine Delle\.$/);
  assert.doesNotMatch(text,/Reisebüro|Social Engineering|Weiterführende/);
});
test('Fiktive Monatskarte wird als echtes 1200 x 630 PNG generiert',()=>{
  const c=get('die-kleine-delle');
  assert.equal(c.campaign.transit_card,true);
  const png=renderCampaignImage(c);
  assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10]);
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  assert.ok(png.length>5000);
});
test('China-Anzeige bleibt als sichtbare Fiktion ausserhalb des Prosatextes',()=>{
  const build=readFileSync('scripts/build.mjs','utf8');
  assert.match(build,/FERNWEHFORMULAR/);
  assert.match(build,/Fiktive Reisebüroanzeige/);
  assert.match(build,/bridge\+travelAd/);
});
