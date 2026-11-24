import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderDocumentChapter} from '../scripts/lib.mjs';
test('Episode 19 preserves narrative order and renders four fictional records plus dashboard',()=>{
 const raw=readFileSync('content/chapters/eigentlich-ganz-okay.md','utf8');
 const html=renderDocumentChapter(raw);
 assert.equal((html.match(/class="roman-dokument roman-akte"/g)||[]).length,4);
 assert.equal((html.match(/class="roman-dokument roman-dashboard"/g)||[]).length,1);
 assert.match(html,/<th scope="col">Angebotsvolumen<\/th>/);
 assert.match(html,/<li>Kundennutzen: hoch<\/li>/);
 assert.doesNotMatch(html,/::: /);
 const anchors=['Die scheint erstaunlich personenbezogen zu sein.','Vergütungsstrategie im Bestand','Er kannte solche Gespräche.','Projekt: Intelligent Travel Experience','Offenbar für das falsche Unternehmen.','Projektanalyse: Automatisierung Kundenservice','Dass ich mich jetzt wieder ein bisschen besser fühle.','Risiko: Verlust informeller Wissens- und Unterstützungsstrukturen','Eigentlich ist es ja ganz okay.','Kein unmittelbarer Handlungsbedarf'];
 let last=-1;for(const anchor of anchors){const next=html.indexOf(anchor);assert.ok(next>last,anchor);last=next;}
 assert.throws(()=>renderDocumentChapter(raw.replace('::: ende','::: akte')));
 assert.ok(renderDocumentChapter(raw.replace('Tariq hatte bereits','<script>Tariq hatte bereits')).includes('&lt;script&gt;'));
});
