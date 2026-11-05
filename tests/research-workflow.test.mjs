import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateManifest,readJson,markdownToHtml} from '../scripts/lib.mjs';
import {renderResearchChapter,validateResearchSources} from '../scripts/references.mjs';

const config=readJson('config/site.json');
const manifest=readJson('content/chapters/index.json');
const readProse=c=>readFileSync(c.path,'utf8').replace(/^# [^\n]+\n+/,'');
const catalogs=manifest.chapters.filter(c=>c.research?.status==='linked').map(c=>({chapter:c,catalog:readJson(c.research.path),prose:readProse(c)}));

test('Three approved chapters and one release candidate have traceable research decisions',()=>{
 assert.equal(manifest.chapters.length,4);
 assert.equal(manifest.chapters.filter(c=>c.status==='approved').length,3);
 assert.equal(manifest.chapters.filter(c=>c.status==='release-candidate').length,1);
 assert.ok(manifest.chapters.every(c=>c.research.status==='linked'));
 assert.deepEqual(validateManifest(config,manifest),[]);
 assert.equal(catalogs.length,4);
});
test('All chapter-specific source anchors are distinct, ordered and genuinely in the prose',()=>{
 for(const {chapter,catalog,prose} of catalogs){
  assert.equal(catalog.chapter_id,chapter.id);
  assert.equal(catalog.reviewed_on,chapter.research.reviewed_on);
  assert.deepEqual(validateResearchSources(prose,catalog,chapter.id),[],chapter.id);
  const {chapterHtml,notesHtml}=renderResearchChapter(prose,catalog,chapter.id);
  const inlines=catalog.sources.filter(s=>s.placement==='inline');
  assert.ok(inlines.length>=1 && inlines.length<=6);
  assert.equal((chapterHtml.match(/class="research-marker"/g)||[]).length,inlines.length);
  assert.equal((notesHtml.match(/<li id="hintergrund-/g)||[]).length,catalog.sources.length);
  assert.equal((notesHtml.match(/rel="noopener noreferrer"/g)||[]).length,catalog.sources.length);
  assert.doesNotMatch(notesHtml,/<script|<iframe|<img/i);
  const noMarkers=chapterHtml.replace(/ <sup class="research-sup">[\s\S]*?<\/sup>/g,'');
  assert.equal(noMarkers,markdownToHtml(prose),'Rendered source notes must not change the approved prose: '+chapter.id);
 }
});
test('Future chapters cannot be approved without a source review or a reasoned exception',()=>{
 const unreviewed=structuredClone(manifest);delete unreviewed.chapters[0].research;
 assert.ok(validateManifest(config,unreviewed).some(e=>e.includes('Missing research decision')));
 const pending=structuredClone(manifest);pending.chapters[0].research={status:'pending'};
 assert.ok(validateManifest(config,pending).some(e=>e.includes('requires completed research')));
 const none=structuredClone(manifest);
 none.chapters[0].research={status:'none',reviewed_on:'2026-11-04',reason:'Die konkrete Folge bietet keinen fachlichen Sachbezug, dessen externe Vertiefung den Lesefluss rechtfertigt.'};
 assert.deepEqual(validateManifest(config,none),[]);
 const badNone=structuredClone(none);badNone.chapters[0].research.reason='';
 assert.ok(validateManifest(config,badNone).some(e=>e.includes('requires documented rationale')));
});
test('Research catalogs cannot be reused for the wrong chapter or exceed subtle marker limit',()=>{
 const {catalog,prose}=catalogs[0],mismatched=structuredClone(catalog);
 assert.ok(validateResearchSources(prose,mismatched,'another-chapter').length);
 const duplicated=structuredClone(catalog);
 duplicated.sources.push({...duplicated.sources[0],id:'fake-repeated'});
 assert.ok(validateResearchSources(prose,duplicated,catalog.chapter_id).length);
 const tooMany=structuredClone(catalog);
 for(let i=0;i<3;i++)tooMany.sources.push({...catalog.sources[0],id:'marker-'+i,anchor:'Ein völlig neuer Satz '+i});
 assert.ok(validateResearchSources(prose,tooMany,catalog.chapter_id).some(e=>e.includes('1 bis 6')));
});
