import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const manifest=JSON.parse(readFileSync('content/chapters/index.json','utf8'));
const chapter=manifest.chapters.find(c=>c.id==='verfuegbar');
const source=readFileSync('content/chapters/verfuegbar.md','utf8');

test('Verfügbar retains human-reviewed story provenance and exact fiction status',()=>{
 assert.ok(chapter,'episode registered');
 assert.equal(chapter.position,5);
 assert.equal(chapter.status,'approved');
 assert.equal(chapter.approved_at,'2026-11-05');
 assert.equal(chapter.campaign.streaming_card,true);
 assert.equal(chapter.research.status,'linked');
 assert.ok(source.length>8000);
 assert.ok(source.includes('Vielleicht traf er dann jemanden.'));
 assert.ok(!source.includes('Anzeige · fiktive Werbung'),'ads belong only to presentation layer');
});

test('Reader uses the exact, already existing Partnerwelt share destination',()=>{
 const build=readFileSync('scripts/build.mjs','utf8');
 const share='/partnerwelt/share/vier-stunden-zwei-uhren/';
 assert.ok(build.includes(share));
 assert.ok(build.includes('c.id===\'verfuegbar\''));
 assert.ok(build.includes('fictional-sla-ad'));
 assert.ok(build.includes('/partnerwelt/prscnm/'));
 assert.ok(build.includes('campaign.streaming_card'));
 const social=readFileSync('scripts/partnerwelt-social.mjs','utf8');
 assert.ok(social.includes("id:'vier-stunden-zwei-uhren'"));
});

test('prscnm is independent, self-contained, no misleading subscription and clearly fictional',()=>{
 const folder='public/partnerwelt/';
 const home=readFileSync(folder+'prscnm/index.html','utf8');
 const backstage=readFileSync(folder+'prscnm/hinter-den-kulissen/index.html','utf8');
 assert.match(home,/FIKTIVER STREAMINGKANAL/);
 assert.match(home,/noindex,follow/);
 assert.ok(home.includes('https://folgenreich.benjamin-lam.de/share/verfuegbar.png'));
 assert.match(home,/prscnm-share\.svg/);
 assert.match(home,/Programm entdecken/);
 assert.ok(!home.includes('Proscenium'));
 assert.ok(backstage.includes('Benjamin Lam: KI lohnt sich dort'));
 assert.ok(backstage.includes('https://benjamin-lam.github.io/quelle-auf/articles/'));
 assert.ok(existsSync(folder+'assets/prscnm.css'));
 assert.ok(existsSync(folder+'assets/prscnm-share.svg'));
 const svg=readFileSync(folder+'assets/prscnm-share.svg','utf8');
 assert.ok(svg.includes('width="1200" height="630"'));
 assert.ok(!/prime video|amazon original|netflix|reacher|picard/i.test(svg));
});

test('Building code preserves clear ad and research separation',()=>{
 const build=readFileSync('scripts/build.mjs','utf8');
 assert.ok(build.includes('timeAnchor,timeAnchor+fictionalAd'));
 assert.match(build,/campaign\.streaming_card/);
 assert.ok(build.includes('renderResearchChapter'));
 const css=readFileSync('public/style.css','utf8');
 assert.match(css,/@media print\{\.chapter-text \.fictional-sla-ad\{display:none!important\}\}/);
});
