import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {renderContextArticle,articleSlug} from '../scripts/context-article.mjs';import {renderCampaignImage} from '../scripts/social-image.mjs';
const md=readFileSync('content/magazine/2026-12/ki-lesbar.md','utf8');
test('Independent context verification article preserves all ten sections, method and external sources',()=>{
 const html=renderContextArticle({markdown:md,stylesheet:'',site:'https://folgenreich.benjamin-lam.de'});
 assert.equal((html.match(/<section id=/g)||[]).length,12);
 assert.equal((html.match(/<table /g)||[]).length,5);
 for(let i=1;i<=10;i++)assert.ok(html.includes('>'+String(i).padStart(2,'0')+' — '),'chapter '+i);
 for(let i=1;i<=9;i++){assert.ok(html.includes('id="q'+i+'"'));assert.ok(html.includes('href="#q'+i+'"'));}
 for(const n of ['T01','T06','Context Verified Development','SHA-256','RFC 9110','methodischer Vorschlag'])assert.ok(html.includes(n),n);
 assert.doesNotMatch(html,/CASE STUDY|Fallstudie|Jahresplaner|Assistent [ABC]|\bLeon\b|\bAlex\b|2\.500 €|750 €|8\.000 €|9\.600 €|\/intranet\/|\/roman\//);
 assert.ok(html.includes(articleSlug+'share-preview.png'));
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 for(const ref of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(ref[1]),'missing anchor '+ref[1]);
 const png=renderCampaignImage({position:1,campaign:{accent:'#E8FF00',context_editorial_card:true}});
 assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});
test('Magazine teaser and publication metadata do not advertise an agency case study',()=>{
 const build=readFileSync('scripts/build.mjs','utf8');
 const teaser=build.split('\n').find(s=>s.startsWith('const editionCard='));
 assert.ok(teaser);assert.doesNotMatch(teaser,/Fallstudie|Agentur|Experiment/);
 const config=JSON.parse(readFileSync('config/publications.json','utf8'));
 const row=config.site_pages.find(p=>p.slug===articleSlug);assert.ok(row);assert.doesNotMatch(row.description,/Fallstudie|Agentur/);
});
