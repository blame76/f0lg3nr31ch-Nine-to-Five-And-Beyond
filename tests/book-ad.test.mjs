import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {renderAdminBookAd} from '../scripts/book-ad.mjs';

const chapter='der-zweite-tab';
const htmlPath='dist/roman/'+chapter+'/index.html';

test('Fiktive Buchanzeige ist eindeutig beschriftet, kein Shop oder Tracking',()=>{
 const ad=renderAdminBookAd();
 assert.match(ad,/<aside class="fictional-book-ad" aria-label="Fiktive Buchwerbung">/);
 assert.match(ad,/Anzeige · Fiktive Buchwerbung/);
 assert.match(ad,/Die Kunst, Post-its richtig zu kleben/);
 assert.match(ad,/Benjamin Lam/);
 assert.match(ad,/14,90 €/);
 assert.match(ad,/kein Kaufangebot/);
 assert.ok(!/<a\\b|<script|<iframe|<img|onclick=|onerror=|dataLayer/i.test(ad));
 assert.equal((ad.match(/class="book-cover"/g)||[]).length,1);
});

test('Buchkachel ersetzt den Dialog im Reader ohne die Schulung vorwegzunehmen',()=>{
 const r=spawnSync(process.execPath,['scripts/build.mjs'],{encoding:'utf8',maxBuffer:1024*1024*4});
 assert.equal(r.status,0,r.stderr);
 const html=readFileSync(htmlPath,'utf8');
 const start=html.indexOf('<article class="reader"'),end=html.indexOf('</article>',start);
 const reading=html.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.equal((reading.match(/class="fictional-book-ad"/g)||[]).length,1);
 assert.ok(reading.indexOf('Leon nahm drei Pistazien')<reading.indexOf('class="fictional-book-ad"'));
 assert.ok(reading.indexOf('class="fictional-book-ad"')<reading.indexOf('Leon tippte auf den Buchtitel'));
 assert.ok(reading.indexOf('class="fictional-book-ad"')<reading.indexOf('Im Schulungsraum'));
 assert.doesNotMatch(reading,/Hast du schon diese KI-Schulung gemacht|Werde berichten/);
 assert.match(reading,/Ein privates Konto ist keine betriebliche Freigabe/);
 assert.match(reading,/Der zweite Tab war noch offen/);
 for(const c of ['die-null-am-ende','wer-haelt-die-verantwortung-fest','how-to-service']){
  assert.doesNotMatch(readFileSync('dist/roman/'+c+'/index.html','utf8'),/fictional-book-ad/);
 }
});
test('Werbung ist responsiv, layoutstabil und beim Druck ausgeschlossen',()=>{
 const css=readFileSync('public/style.css','utf8');
 assert.ok(css.includes('aspect-ratio:3 / 4.35'));
 assert.ok(css.includes('@media(max-width:520px)'));
 assert.ok(css.includes('@media print{.fictional-book-ad{display:none!important}}'));
});
