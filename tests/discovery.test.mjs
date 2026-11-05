import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderLlmsTxt,renderRss,renderNotFound,renderArdManifest,renderLegacyAiCatalog} from '../scripts/discovery.mjs';
const config=JSON.parse(readFileSync('config/site.json','utf8'));
const chapters=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters;
const site=config.site_url;

test('llms.txt describes fiction without discovering unapproved chapters',()=>{
 const early=renderLlmsTxt({site,config,chapters,ready:false});
 assert.match(early,/^# f0lg3nr31ch/);
 assert.match(early,/fiktiv/i);
 assert.match(early,/## Projekt und Kontext/);
 assert.match(early,/\[Startseite\]\(https:\/\/folgenreich\.benjamin-lam\.de\/\)/);
 assert.match(early,/\[Über das Experiment\]/);
 assert.match(early,/\[Lizenz und Urheberschaft\]/);
 assert.ok(early.length>50);
 assert.ok((early.match(/\]\(https:\/\//g)||[]).length>=3);
 assert.doesNotMatch(early,/\/roman\/die-null-am-ende\//);
 const pending=chapters.map(c=>({...c,status:'release-candidate',approved_by:undefined,approved_at:undefined}));
 assert.doesNotMatch(renderLlmsTxt({site,config,chapters:pending,ready:true}),/## Freigegebene Romanfolgen/);
 const approved=chapters.filter(c=>c.status==='approved');
 const published=renderLlmsTxt({site,config,chapters:approved,ready:true});
 assert.match(published,/## Freigegebene Romanfolgen/);
 for(const c of approved)assert.ok(published.includes(site+'/roman/'+c.id+'/'));
 assert.ok(published.includes('/roman/der-zweite-tab/'),'an explicitly approved chapter appears only in the hypothetical released feed');
});

test('RSS requires explicit approvals and does not invent dates',()=>{
 const pending=chapters.map(c=>({...c,status:'release-candidate',approved_by:undefined,approved_at:undefined}));
 assert.throws(()=>renderRss({site,config,chapters:pending}),/approved/);
 const approved=chapters.filter(c=>c.status==='approved');
 const feed=renderRss({site,config,chapters:approved});
 assert.match(feed,/<rss version="2.0">/);
 assert.equal((feed.match(/<item>/g)||[]).length,approved.length);
 assert.doesNotMatch(feed,/<pubDate>/);
 assert.match(feed,/Fiktive Romanfolge/);
});

test('404 page is noindex and does not leak editorial notes',()=>{
 const page=renderNotFound();
 assert.match(page,/<meta name="robots" content="noindex">/);
 assert.match(page,/404 – Seite nicht gefunden/);
 assert.ok(!page.includes('release-candidate'));
});

test('ARD catalogs honestly advertise zero callable resources',()=>{
 const ard=JSON.parse(renderArdManifest());
 const legacy=JSON.parse(renderLegacyAiCatalog());
 assert.deepEqual(ard,{entries:[]});
 assert.deepEqual(legacy,{specVersion:'1.0',entries:[]});
 const headers=readFileSync('public/_headers','utf8');
 assert.match(headers,/\/\.well-known\/ard\.json\s+Content-Type: application\/json; charset=utf-8/);
 assert.match(headers,/\/\.well-known\/ai-catalog\.json\s+Content-Type: application\/json; charset=utf-8/);
});
