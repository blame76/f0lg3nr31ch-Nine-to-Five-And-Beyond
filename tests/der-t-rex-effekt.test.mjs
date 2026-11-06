import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inflateSync} from 'node:zlib';
import {renderCampaignImage} from '../scripts/social-image.mjs';

const chapters=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters;
const chapter=chapters.find(c=>c.id==='der-t-rex-effekt');
const novel=readFileSync(chapter.path,'utf8');

test('Freitag als neue Folge 06: ausdrücklich nur der Morgen im Reader',()=>{
 assert.equal(chapter.position,6);
 assert.equal(chapter.status,'approved');
 assert.equal(chapter.source_ref,'draft/der-t-rex-effekt-vollfassung-20261106');
 assert.equal(chapter.source_blob_sha,'2af46204674aaa278409281d433a9ce799bc8cc1');
 assert.ok(novel.startsWith('# Der T-Rex-Effekt\n'));
 assert.ok(novel.trimEnd().endsWith('Um neun musste er im Meeting sein.'));
 for(const phrase of ['Um vierzehn Uhr zwölf','Das Gespräch in der Kita dauerte','Lotta','Emma','Ein Einhorn gegen einen Triceratops'])
   assert.ok(!novel.includes(phrase),'Kein unveröffentlichter Nachmittag: '+phrase);
 assert.ok(novel.includes('„Papa, das ist kein Meeting.“'));
 assert.ok(novel.includes('„Mit beiden Kindern?“'));
});

test('Kampagne: Dino-Kalender statt fachlicher Recherchelinks',()=>{
 assert.equal(chapter.campaign.calendar_card,true);
 assert.equal(chapter.research.status,'none');
 assert.ok(chapter.campaign.image_alt.includes('Dinosaurier'));
 assert.ok(chapter.campaign.image_alt.includes('Restaurant'));
 assert.ok(chapter.campaign.image_alt.includes('100 % Rabatt'));
 const png=renderCampaignImage(chapter);
 assert.equal(png.readUInt32BE(16),1200);
 assert.equal(png.readUInt32BE(20),630);
 assert.ok(inflateSync(png.subarray(41,41+png.readUInt32BE(33))).length>2_000_000);
});
