import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderResearchChapter,validateResearchSources} from '../scripts/references.mjs';
const prose=readFileSync('content/chapters/how-to-service.md','utf8').replace(/^# [^\n]+\n+/,'');
const catalog=JSON.parse(readFileSync('content/references/how-to-service.json','utf8'));
test('Quellenkatalog: eindeutige Anker, HTTPS und geprüfte Aussagen',()=>{
 assert.deepEqual(validateResearchSources(prose,catalog),[]);
 assert.equal(catalog.sources.filter(s=>s.placement==='inline').length,6);
 assert.equal(catalog.sources.filter(s=>s.placement==='further').length,2);
});
test('Sechs dezente Fußnoten im Prosatext, acht Belege nach dem Text',()=>{
 const {chapterHtml,notesHtml}=renderResearchChapter(prose,catalog);
 assert.equal((chapterHtml.match(/class="research-marker"/g)||[]).length,6);
 assert.equal((notesHtml.match(/<li id="hintergrund-/g)||[]).length,8);
 assert.match(notesHtml,/Hinter der Geschichte/);
 assert.match(notesHtml,/2026/);
 assert.match(chapterHtml,/<em>Betriebsübernahme bestätigt\.<\/em>/);
 assert.doesNotMatch(chapterHtml,/PCI Security Standards Council|https:\/\/sre.google/);
});
test('Drift durch Änderung oder doppelte Verankerung fällt auf',()=>{
 const original=catalog.sources.find(s=>s.id==='restore').anchor;
 assert.ok(validateResearchSources(prose.replace(original,'eine andere Frage'),catalog).some(s=>s.includes('restore')));
 assert.ok(validateResearchSources(prose+'\n'+original,catalog).some(s=>s.includes('restore')));
});
test('Kein externes Skript oder automatisch geladenes Fremdmaterial',()=>{
 const {notesHtml}=renderResearchChapter(prose,catalog);
 assert.doesNotMatch(notesHtml,/<script|<iframe|<img/i);
 assert.equal((notesHtml.match(/rel="noopener noreferrer"/g)||[]).length,8);
});
