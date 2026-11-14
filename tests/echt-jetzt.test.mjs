import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderCampaignImage} from '../scripts/social-image.mjs';
const html=readFileSync(new URL('../public/partnerwelt/echt-jetzt/index.html',import.meta.url),'utf8');
const build=readFileSync(new URL('../scripts/build.mjs',import.meta.url),'utf8');
test('ECHT JETZT marks fiction and AI use before the agency offer',()=>{
 assert.match(html, /<html lang="de">/);
 const notice=html.indexOf('Fiktive Agentur · Satire · KI-unterstützt erstellt');
 assert.ok(notice>=0 && notice<html.indexOf('<h1'));
 assert.match(html,/Keine Dienstleistungen, keine Käufe, keine Zertifikate/);
 assert.match(html,/Wer verifiziert die Verifizierung/);
});
test('ECHT JETZT has three native disclosure controls, no active external integrations',()=>{
 assert.equal((html.match(/<details>/g)||[]).length,3);
 assert.equal((html.match(/<summary>/g)||[]).length,3);
 assert.doesNotMatch(html,/<form\b|<iframe\b|<script\b[^>]*\bsrc=|<img\b/i);
 assert.match(html,/<link rel="canonical" href="https:\/\/folgenreich\.benjamin-lam\.de\/partnerwelt\/echt-jetzt\/">/);
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema['@type'],'CreativeWork');
});
test('ECHT JETZT has navigation and respects the public indexing decision in the build',()=>{
 assert.match(build,/const echtJetztSlug='partnerwelt\/echt-jetzt\/'/);
 assert.match(build,/href="\/partnerwelt\/echt-jetzt\/"/);
 assert.match(build,/\(ready \|\| publicIndexReady\)\?\[echtJetztSlug\]:\[\]/);
});

test('ECHT JETZT uses a dedicated 1200 by 630 PNG share card',()=>{
 const url='https://folgenreich.benjamin-lam.de/partnerwelt/echt-jetzt/share-preview.png';
 assert.ok(html.includes('property="og:image" content="'+url+'"'));
 assert.ok(html.includes('name="twitter:image" content="'+url+'"'));
 assert.match(html,/Dieses Bild ist KI\. Die anderen vielleicht nicht\./);
 const png=renderCampaignImage({position:1,campaign:{accent:'#f5ce65',echt_jetzt_card:true}});
 assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(png.readUInt32BE(16),1200);
 assert.equal(png.readUInt32BE(20),630);
 assert.ok(png.equals(renderCampaignImage({position:1,campaign:{accent:'#f5ce65',echt_jetzt_card:true}})));
 assert.match(build,/echt_jetzt_card:true/);
});
