import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCampaignImage} from '../scripts/social-image.mjs';
import {renderResearchChapter,validateResearchSources} from '../scripts/references.mjs';
test('Episode 15 preserves the manuscript ending and has four independent source links',()=>{
 const c=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters.find(x=>x.id==='was-kosten-die-einsparungen');
 assert.equal(c.status,'approved');assert.equal(c.position,15);assert.equal(c.research.status,'linked');
 const prose=readFileSync(c.path,'utf8').replace(/^# [^\n]+\n+/,'');
 assert.match(prose,/Er sollte sie halten\.\s*$/);assert.doesNotMatch(prose,/Arbeitsfassung/);
 const cat=JSON.parse(readFileSync(c.research.path,'utf8'));assert.equal(cat.sources.length,4);
 assert.deepEqual(validateResearchSources(prose,cat,c.id),[]);
 const result=renderResearchChapter(prose,cat,c.id);
 assert.equal((result.chapterHtml.match(/class="research-marker"/g)||[]).length,4);
 assert.match(result.notesHtml,/Deutsche Bundesbank/);
 assert.equal(c.campaign.christmas_invitation_card,true);
 const png=renderCampaignImage(c);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);assert.ok(png.equals(renderCampaignImage(c)));
});
