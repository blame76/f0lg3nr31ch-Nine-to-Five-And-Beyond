import test from 'node:test';
import assert from 'node:assert/strict';
import {readJson} from '../scripts/lib.mjs';
import {publicationEntries,renderSitemap,renderPublicationFeed} from '../scripts/publications.mjs';
import {renderLlmsTxt} from '../scripts/discovery.mjs';
const config=readJson('config/site.json'),chapters=readJson('content/chapters/index.json').chapters,site=config.site_url;
const entries=publicationEntries({config,chapters,publicIndexReady:true,chapterIndexReady:true});
test('All approved chapters, magazine, streaming, and six social items share one discovery registry',()=>{
 const indexable=entries.filter(p=>p.index);
 const map=renderSitemap(site,entries);
 const llms=renderLlmsTxt({config,chapters,site,entries});
 for(const p of indexable){assert.ok(map.includes('<loc>'+site+'/'+p.slug+'</loc>'));assert.ok(llms.includes(']('+site+'/'+p.slug+')'));}
 assert.equal((map.match(/<loc>/g)||[]).length,indexable.length);
 assert.equal((llms.match(/\]\(https:\/\//g)||[]).length,indexable.length);
 for(const slug of ['magazin/','magazin/white-trash-whitepapers/2026-12/','magazin/white-trash-whitepapers/2026-12/interview/','partnerwelt/prscnm/','partnerwelt/prscnm/hinter-den-kulissen/','partnerwelt/echt-jetzt/'])assert.ok(indexable.some(p=>p.slug===slug),slug);
 assert.equal(indexable.filter(p=>p.section==='Social-Labor').length,6);
 for(const p of entries.filter(p=>!p.index))assert.ok(!map.includes('<loc>'+site+'/'+p.slug+'</loc>'));
 assert.doesNotMatch(map,/<lastmod>/,'do not invent dates');
});
test('Editorial policy gates are independent and a pending chapter never becomes indexable',()=>{
 const mixed=[...chapters.slice(0,-1),{...chapters.at(-1),status:'release-candidate'}];
 const rows=publicationEntries({config,chapters:mixed,publicIndexReady:false,chapterIndexReady:true});
 assert.equal(rows.filter(p=>p.index).length,chapters.length-1);
 assert.ok(rows.filter(p=>p.index).every(p=>p.type==='Chapter'));
 const closed=publicationEntries({config,chapters,publicIndexReady:false,chapterIndexReady:false});
 assert.ok(closed.every(p=>!p.index));
});
test('RSS contains only approved editorial content, without fake publication dates',()=>{
 const feed=renderPublicationFeed(site,config,entries);
 assert.equal((feed.match(/<item>/g)||[]).length,entries.filter(p=>p.index&&p.feed).length);
 assert.doesNotMatch(feed,/<pubDate>/);
 assert.match(feed,/Fiktives Lernbeispiel/);
});
