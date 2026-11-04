import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderLlmsTxt,renderRss,renderNotFound} from '../scripts/discovery.mjs';
const config=JSON.parse(readFileSync('config/site.json','utf8'));
const chapters=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters;
const site=config.site_url;

test('llms.txt describes fiction without discovering unapproved chapters',()=>{
 const early=renderLlmsTxt({site,config,chapters,ready:false});
 assert.match(early,/^# f0lg3nr31ch/);
 assert.match(early,/fiktiv/i);
 assert.doesNotMatch(early,/## Roman/);
 assert.doesNotMatch(early,/\/roman\/die-null-am-ende\//);
 assert.doesNotMatch(renderLlmsTxt({site,config,chapters,ready:true}),/## Roman/);
 const approved=chapters.map(c=>({...c,status:'approved',approved_by:'Autor',approved_at:'2026-11-04'}));
 const published=renderLlmsTxt({site,config,chapters:approved,ready:true});
 assert.match(published,/## Roman/);
 for(const c of chapters)assert.ok(published.includes(site+'/roman/'+c.id+'/'));
});

test('RSS requires explicit approvals and does not invent dates',()=>{
 assert.throws(()=>renderRss({site,config,chapters}),/approved/);
 const approved=chapters.map(c=>({...c,status:'approved',approved_by:'Autor',approved_at:'2026-11-04'}));
 const feed=renderRss({site,config,chapters:approved});
 assert.match(feed,/<rss version="2.0">/);
 assert.equal((feed.match(/<item>/g)||[]).length,chapters.length);
 assert.doesNotMatch(feed,/<pubDate>/);
 assert.match(feed,/Fiktive Romanfolge/);
});

test('404 page is noindex and does not leak editorial notes',()=>{
 const page=renderNotFound();
 assert.match(page,/<meta name="robots" content="noindex">/);
 assert.match(page,/404 – Seite nicht gefunden/);
 assert.ok(!page.includes('release-candidate'));
});
