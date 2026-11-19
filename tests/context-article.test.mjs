import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {renderContextArticle,articleSlug} from '../scripts/context-article.mjs';import {renderCampaignImage} from '../scripts/social-image.mjs';
const md=readFileSync('content/magazine/2026-12/ki-lesbar.md','utf8');
test('Context verification article preserves full editorial structure and fiction boundary',()=>{
 const html=renderContextArticle({markdown:md,stylesheet:'',site:'https://folgenreich.benjamin-lam.de'});
 assert.equal((html.match(/<section id=/g)||[]).length,13);
 assert.equal((html.match(/<table /g)||[]).length,7);
 assert.match(html,/Fiktive Fallstudie aus der Romanwelt/);assert.match(html,/vollständig fiktive Versuchsergebnisse/);
 assert.ok(html.indexOf('Ende der fiktiven Fallstudie')<html.indexOf('02 — HTTP 200'));
 for(let i=1;i<=9;i++){assert.ok(html.includes('id="q'+i+'"'));assert.ok(html.includes('href="#q'+i+'"'));}
 for(const n of ['2.500 €','750 €','8.000 €','9.600 €','T06','Context Verified Development'])assert.ok(html.includes(n),n);
 assert.match(html,/href="\/intranet\/365-tage-e-commerce\/"/);assert.ok(html.includes(articleSlug+'share-preview.png'));
 const png=renderCampaignImage({position:1,campaign:{accent:'#E8FF00',context_editorial_card:true}});
 assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});
