import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderAdminBookAd} from '../scripts/book-ad.mjs';
import {markdownToHtml} from '../scripts/lib.mjs';

test('Fiktive Buchanzeige ist klar beschriftet, ohne Shop oder Tracking',()=>{
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

test('Buchkachel wird nur im Reader von Folge 04 an der Küchenstelle ergänzt',()=>{
 const text=readFileSync('content/chapters/der-zweite-tab.md','utf8');
 const intro='Leon nahm drei Pistazien. Der Admin schraubte das Gefäß zu und schlug sein Buch wieder auf.';
 const next='Leon tippte auf den Buchtitel.';
 const school='Im Schulungsraum ließ sich die Leuchtstoffröhre';
 assert.ok(text.indexOf(intro)>0);
 assert.ok(text.indexOf(intro)<text.indexOf(next));
 assert.ok(text.indexOf(next)<text.indexOf(school));
 assert.doesNotMatch(text,/Hast du schon diese KI-Schulung gemacht|Werde berichten/);
 assert.match(text,/Ein privates Konto ist keine betriebliche Freigabe/);
 assert.match(text,/Der zweite Tab war noch offen/);
 const adAnchor='<p>'+intro+'</p>';
 const html=markdownToHtml(text.replace(/^# [^\\n]+\\n+/,'')); 
 assert.ok(html.includes(adAnchor));
 const withAd=html.replace(adAnchor,adAnchor+renderAdminBookAd());
 assert.equal((withAd.match(/class="fictional-book-ad"/g)||[]).length,1);
 assert.ok(withAd.indexOf(intro)<withAd.indexOf('fictional-book-ad'));
 assert.ok(withAd.indexOf('fictional-book-ad')<withAd.indexOf(next));
 assert.ok(withAd.indexOf(next)<withAd.indexOf(school));
 const builder=readFileSync('scripts/build.mjs','utf8');
 assert.match(builder,/c.id==='der-zweite-tab'/);
 assert.ok(builder.includes('renderAdminBookAd()'));
 assert.match(builder,/chapterHtml/);
});

test('Werbung ist responsiv, layoutstabil und beim Druck ausgeschlossen',()=>{
 const css=readFileSync('public/style.css','utf8');
 assert.ok(css.includes('aspect-ratio:3 / 4.35'));
 assert.ok(css.includes('@media(max-width:520px)'));
 assert.ok(css.includes('@media print{.fictional-book-ad{display:none!important}}'));
});
