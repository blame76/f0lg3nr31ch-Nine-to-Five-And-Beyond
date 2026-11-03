import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inflateSync} from 'node:zlib';
import {spawnSync} from 'node:child_process';
import {renderCampaignImage} from '../scripts/social-image.mjs';

const chapters=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters;
test('Every novel chapter has a distinct fictional campaign and social preview',()=>{
 assert.equal(chapters.length,3);
 assert.equal(new Set(chapters.map(c=>c.campaign.image)).size,3);
 assert.equal(new Set(chapters.map(c=>c.campaign.social_title)).size,3);
 for(const c of chapters){
  assert.match(c.campaign.category,/Fiktiv/i);
  assert.match(c.campaign.seo_description,/fiktiv|roman/i);
  assert.match(c.campaign.social_description,/fiktiv|roman/i);
  assert.ok(c.campaign.context.length>70);
 }
});

test('Each generated social image is a valid 1200x630 PNG, different from others',()=>{
 const hashes=new Set();
 for(const c of chapters){
  const image=renderCampaignImage(c);
  assert.deepEqual([...image.subarray(0,8)],[137,80,78,71,13,10,26,10]);
  assert.equal(image.readUInt32BE(16),1200);
  assert.equal(image.readUInt32BE(20),630);
  assert.equal(image[24],8);
  assert.equal(image[25],2);
  const type=image.toString('ascii',37,41);
  assert.equal(type,'IDAT');
  const size=image.readUInt32BE(33);
  assert.equal(inflateSync(image.subarray(41,41+size)).length,630*(1+1200*3));
  hashes.add(image.toString('base64').slice(-1200));
 }
 assert.equal(hashes.size,3);
});

test('Build uses per-chapter OG images, truthful SEO, and preserves noindex before approval',()=>{
 const r=spawnSync(process.execPath,['scripts/build.mjs'],{encoding:'utf8',maxBuffer:1024*1024*4});
 assert.equal(r.status,0,r.stderr);
 for(const c of chapters){
  const html=readFileSync('dist/roman/'+c.id+'/index.html','utf8');
  assert.match(html,/name="robots" content="noindex,follow"/);
  assert.ok(html.includes('property="og:image" content="https://folgenreich.benjamin-lam.de/'+c.campaign.image+'"'));
  assert.ok(html.includes('property="og:title" content="'+c.campaign.social_title.replace(/&/g,'&amp;')+'"'));
  assert.ok(html.includes('Fiktive Agenturkampagne aus dem Roman'));
  // The native browser reader should discover the prose, not a pre-chapter campaign.
  const article=html.indexOf('<article class="reader"');
  const articleEnd=html.indexOf('</article>',article);
  const pager=html.indexOf('<nav class="pager"',articleEnd);
  const campaign=html.indexOf('<aside class="campaign-bridge"',pager);
  const publicationNote=html.indexOf('<aside class="notice"',campaign);
  assert.ok(article>0&&articleEnd>article&&pager>articleEnd&&campaign>pager&&publicationNote>campaign);
  assert.ok(html.includes('<div class="chapter-text">'));
  assert.ok(html.includes('<meta name="author" content="Benjamin Lam">'));
  assert.ok((html.slice(article,articleEnd).match(/<p>/g)||[]).length>20);
  assert.ok(!html.slice(html.indexOf('<body>')).includes('<img'), 'OG images belong in metadata, not body');
  assert.ok(html.indexOf('class="footer-disclosure"')>html.indexOf('</main>'));
  assert.ok(!html.includes('class="fiction-ribbon"'));
  assert.ok(html.includes('<h1 id="chapter-title">'+c.title+'</h1>'));
  assert.ok(!html.includes('"@type":"JobPosting"'));
  assert.ok(!html.includes('"@type":"LocalBusiness"'));
  assert.deepEqual([...readFileSync('dist/'+c.campaign.image).subarray(0,8)],[137,80,78,71,13,10,26,10]);
 }
 assert.match(readFileSync('dist/robots.txt','utf8'),/Allow: \//);
 const home=readFileSync('dist/index.html','utf8');
 assert.ok(home.indexOf('<ol class="list">')<home.indexOf('<aside class="notice"'));
 const css=readFileSync('dist/style.css','utf8');
 assert.match(css,/\.header-inner\{[^}]*padding:1\.1rem 1\.25rem/);
 assert.match(css,/@media print/);

});
