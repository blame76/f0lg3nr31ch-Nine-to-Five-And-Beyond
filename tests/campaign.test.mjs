import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inflateSync} from 'node:zlib';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {renderCampaignImage} from '../scripts/social-image.mjs';
import {escapeMeta} from '../scripts/lib.mjs';

const chapters=JSON.parse(readFileSync('content/chapters/index.json','utf8')).chapters;
test('Every novel chapter has a distinct fictional campaign and social preview',()=>{
 assert.ok(chapters.length>=9, 'Nine published chapters minimum after the 10 November release');
 assert.equal(new Set(chapters.map(c=>c.campaign.image)).size,chapters.length);
 assert.equal(new Set(chapters.map(c=>c.campaign.social_title)).size,chapters.length);
 for(const c of chapters){
  assert.match(c.campaign.category,/Fiktiv/i);
  assert.match(c.campaign.seo_description,/fiktiv|roman/i);
  assert.match(c.campaign.social_description,/fiktiv|roman/i);
  assert.ok(c.campaign.context.length>70);
 }
});

test('Each algorithmically generated social image is a valid 1200x630 PNG, different from others',()=>{
 const hashes=new Set();
 for(const c of chapters){
  if(c.campaign.photo_preview)continue; // The photographic preview is verified from its published JPEG below.
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
 assert.equal(hashes.size,chapters.filter(c=>!c.campaign.photo_preview).length);
});

test('Build uses per-chapter OG images, truthful SEO, and preserves noindex before approval',()=>{
 const r=spawnSync(process.execPath,['scripts/build.mjs'],{encoding:'utf8',maxBuffer:1024*1024*4});
 assert.equal(r.status,0,r.stderr);
 for(const c of chapters){
  const html=readFileSync('dist/roman/'+c.id+'/index.html','utf8');
  assert.match(html,/name="robots" content="index,follow"/);
  assert.ok(html.includes('property="og:image" content="https://folgenreich.benjamin-lam.de/'+c.campaign.image+'"'));
  assert.ok(html.includes('property="og:title" content="'+escapeMeta(c.campaign.social_title)+'"'));
  assert.ok(html.includes('property="og:description" content="'+escapeMeta(c.campaign.social_description)+'"'));
  assert.ok(html.includes('name="twitter:description" content="'+escapeMeta(c.campaign.social_description)+'"'));
  assert.ok(html.includes('property="og:site_name" content="f0lg3nr31ch &#8211; Nine to Five. And Beyond."'));
  const head=html.slice(html.indexOf('<head>'),html.indexOf('</head>'));
  assert.ok(!/[\u0080-\uFFFF]/.test(head),'entire HTML head must be ASCII-only for legacy social crawlers');
  assert.ok(!head.includes('fÃ¼r'));
  assert.ok(!head.includes('â'));
  if(!c.campaign.cocoa_card)assert.ok(html.includes(c.campaign.recipe_card?'Fiktives Rezeptmotiv aus dem Agenturroman':'Fiktive Agenturkampagne aus dem Roman'));
  // The native browser reader should discover the prose, not a pre-chapter campaign.
  const article=html.indexOf('<article class="reader"');
  const articleEnd=html.indexOf('</article>',article);
  const pager=html.indexOf('<nav class="pager"',articleEnd);
  const campaign=html.indexOf('<aside class="campaign-bridge"',pager);
  assert.ok(article>0&&articleEnd>article&&pager>articleEnd);
  if(c.campaign.cocoa_card)assert.equal(campaign,-1,'Kakao is a share preview, not a separate ad in the novel');
  else assert.ok(campaign>pager);
  assert.ok(!html.includes('<aside class="notice"'));
  assert.doesNotMatch(html,/Arbeitsfassung|Release-Kandidat|private[srn]? Autorenarchiv|Öffentliche Vorschau/i);
  assert.ok(html.includes('<div class="chapter-text">'));
  assert.ok(html.includes('<meta name="author" content="Benjamin Lam">'));
  assert.ok((html.slice(article,articleEnd).match(/<p>/g)||[]).length>20);
  assert.ok(!html.slice(html.indexOf('<body>')).includes('<img'), 'OG images belong in metadata, not body');
  assert.ok(html.indexOf('class="footer-disclosure"')>html.indexOf('</main>'));
  assert.ok(!html.includes('class="fiction-ribbon"'));
  assert.ok(html.includes('<h1 id="chapter-title">'+c.title+'</h1>'));
  assert.ok(!html.includes('"@type":"JobPosting"'));
  assert.ok(!html.includes('"@type":"LocalBusiness"'));
  if(c.campaign.photo_preview){
    const photo=readFileSync('dist/'+c.campaign.image);
    assert.deepEqual([...photo.subarray(0,3)],[255,216,255],'JPEG signature');
    assert.equal(createHash('sha256').update(photo).digest('hex'),'b62d628ea1239ac19557767be491c83801e6a29daca41caba9a7583f4709688d');
    assert.match(html,/property="og:image:type" content="image\/jpeg"/);
  } else assert.deepEqual([...readFileSync('dist/'+c.campaign.image).subarray(0,8)],[137,80,78,71,13,10,26,10]);
  if(c.id==='nachvollziehbar'){
    assert.ok(html.includes('Das Pflichtfeld')===false,'Der genehmigte Kapitelname bleibt Nachvollziehbar');
    assert.ok(html.includes('Im Formular blieb das rote Sternchen stehen.'));
    assert.ok(html.includes('Hinter der Geschichte'));
    assert.ok(html.includes('Warum nicht jede nützliche Information nötig ist'));
    assert.ok(!html.includes('Heißer Kakao mit Sahne</h2>'),'Keine nachträgliche Kampagne im Lesetext');
  }
  if(c.id==='vorabexemplar'){
    const slug='/magazin/white-trash-whitepapers/2026-12/';
    assert.ok(html.includes('href="'+slug+'"'));
    assert.ok(html.includes('href="'+slug+'interview/"'));
    const image=readFileSync('dist/'+c.campaign.image);
    assert.equal(image.readUInt32BE(16),1200);
    assert.equal(image.readUInt32BE(20),630);
    assert.equal(createHash('sha256').update(image).digest('hex'),'66ef213bfaa28ae45796d17614f91c5cc0b14d74382fc9524e73ba959814c031');
    const featureImage=readFileSync('dist'+slug+'share-preview.png');
    assert.equal(featureImage.readUInt32BE(16),1200);
    assert.equal(featureImage.readUInt32BE(20),630);
    assert.equal(createHash('sha256').update(featureImage).digest('hex'),'2bf2077e5d4333803d1f79be2605757f9a1c326c675106c1e9189eb2705774fa');
    assert.notDeepEqual(featureImage,image);
    const feature=readFileSync('dist'+slug+'index.html','utf8');
    assert.ok(feature.includes('property="og:image" content="https://folgenreich.benjamin-lam.de'+slug+'share-preview.png"'));
    assert.ok(feature.includes('name="twitter:image" content="https://folgenreich.benjamin-lam.de'+slug+'share-preview.png"'));
    assert.match(feature,/<details class="toc">/);
    assert.match(feature,/id="saving" type="range"/);
    assert.match(feature,/id="discount" type="range"/);
    assert.match(feature,/class="loop"/);
    const ids=[...feature.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length);
    for(const ref of feature.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(ref[1]),'missing anchor '+ref[1]);
    assert.equal((feature.match(/<img\b/g)||[]).length,(feature.match(/class="image-label"/g)||[]).length);
    const conversation=readFileSync('dist'+slug+'interview/index.html','utf8');
    assert.equal((conversation.match(/<img\b/g)||[]).length,(conversation.match(/class="image-label"/g)||[]).length);
    const portrait=readFileSync('dist'+slug+'assets/martin-interview.webp');
    assert.equal(createHash('sha256').update(portrait).digest('hex'),'3a7d4a5b6da62cc0a54ad883a45ab1a666428072987aa5a6a4b6b08bba9f198a');
    for(const route of ['', 'interview/']){
      const page=readFileSync('dist'+slug+route+'index.html','utf8');
      assert.match(page,/WHITE TRASH/);
      assert.match(page,/fiktiv/i);
      assert.match(page,/KI-generiert/i);
      assert.doesNotMatch(page,/Keine Arbeitsplätze abschaffen/);
    }
  }
  if(c.id==='der-t-rex-effekt'){
    assert.ok(html.includes('Wochenende! Offline! Make THE WORLD a BETTER place For CHILDREN!'));
    assert.ok(html.includes('Fiktiver Familienkalender'));
    assert.ok(html.includes('100 % Rabatt'));
    assert.ok(!html.includes('Um vierzehn Uhr zwölf'));
    assert.ok(!html.includes('Lotta'));
    assert.ok(!html.includes('research-notes'));
    assert.ok(html.includes('Um neun musste er im Meeting sein.'));
  }
  if(c.id==='verfuegbar'){
    assert.ok(html.includes('/partnerwelt/share/vier-stunden-zwei-uhren/'));
    assert.ok(html.includes('/partnerwelt/prscnm/'));
    assert.match(html,/Anzeige · fiktive Werbung aus der Partnerwelt/);
    assert.ok(readFileSync('dist/partnerwelt/prscnm/index.html','utf8').includes('Geschichten, die dich nicht loslassen'));
    assert.ok(readFileSync('dist/partnerwelt/prscnm/hinter-den-kulissen/index.html','utf8').includes('Sieben gute Startpunkte'));
  }
 }
 assert.match(readFileSync('dist/robots.txt','utf8'),/Allow: \//);
 const home=readFileSync('dist/index.html','utf8');
 assert.ok(home.includes('<ol class="list">'));
 assert.match(home,/name="robots" content="index,follow"/);
 for(const route of ['roman','experiment','impressum','datenschutz','lizenz']){
  const html=readFileSync('dist/'+route+'/index.html','utf8');
  assert.match(html,/name="robots" content="index,follow"/);
 }
 const map=readFileSync('dist/sitemap.xml','utf8');
 assert.ok(map.includes('https://folgenreich.benjamin-lam.de/roman/'));
 assert.ok(map.includes('https://folgenreich.benjamin-lam.de/roman/der-t-rex-effekt/'),'approved Friday morning is discoverable');
 const llms=readFileSync('dist/llms.txt','utf8');
 assert.match(llms,/\[Startseite\]\(https:\/\/folgenreich\.benjamin-lam\.de\/\)/);
 assert.match(llms,/\[Lizenz und Urheberschaft\]/);
 assert.ok(llms.includes('/roman/der-t-rex-effekt/'),'approved morning appears in llms.txt');
 assert.deepEqual(JSON.parse(readFileSync('dist/.well-known/ard.json','utf8')),{entries:[]});
 assert.deepEqual(JSON.parse(readFileSync('dist/.well-known/ai-catalog.json','utf8')),{specVersion:'1.0',entries:[]});
 assert.ok(!readFileSync('dist/robots.txt','utf8').includes('Disallow: /'));
 assert.ok(!readFileSync('dist/robots.txt','utf8').includes('noindex'));
 assert.doesNotMatch(home,/Öffentliche Vorschau|Release-Kandidat|Arbeitsfassung/i);
 for(const route of ['roman','experiment','impressum','datenschutz','lizenz']){
  const html=readFileSync('dist/'+route+'/index.html','utf8');
  assert.doesNotMatch(html,/Arbeitsfassung|Release-Kandidat|privaten Autorenarchiv|öffentliche Vorschau|Vor finaler Live-Freigabe|vor der endgültigen Veröffentlichungsfreigabe/i);
 }
 const css=readFileSync('dist/style.css','utf8');
 assert.match(css,/\.header-inner\{[^}]*padding:1\.1rem 1\.25rem/);
 assert.match(css,/@media print/);

});

test('UTF-8 social metadata becomes safe ASCII-only numeric HTML references',()=>{
 assert.equal(escapeMeta('für – Verantwortung'), 'f&#252;r &#8211; Verantwortung');
 assert.equal(escapeMeta('Ä & <Kunde>'), '&#196; &amp; &lt;Kunde&gt;');
 const headers=readFileSync('public/_headers','utf8');
 assert.match(headers,/\/roman\/\*\s+Content-Type: text\/html; charset=utf-8/);
 assert.match(headers,/^\/\s+Content-Type: text\/html; charset=utf-8/m);
 assert.ok(!headers.includes('/share/*\n  Content-Type'));
});

test('Episode 13 is author-approved and has one self-generated fictional Bingo image',()=>{
 const c=chapters.find(ch=>ch.id==='die-fehlende-uebersetzungsfunktion');
 assert.ok(c);
 assert.equal(c.position,13);
 assert.equal(c.status,'approved');
 assert.equal(c.approved_at,'2026-11-13');
 assert.equal(c.campaign.bingo_card,true);
 assert.match(c.campaign.image_alt,/Fiktive Buzzword-Bingo-Karte/);
 assert.match(c.campaign.context,/Workshop-Einladung/);
 const image=renderCampaignImage(c);
 assert.deepEqual([...image.subarray(0,8)],[137,80,78,71,13,10,26,10]);
 assert.equal(image.readUInt32BE(16),1200);
 assert.equal(image.readUInt32BE(20),630);
 const html=readFileSync('dist/roman/die-fehlende-uebersetzungsfunktion/index.html','utf8');
 assert.match(html,/Fiktive Buzzword-Bingo-Karte/);
 assert.match(html,/Die fehlende Übersetzungsfunktion/);
 assert.doesNotMatch(html,/Arbeitsfassung|auf Wunsch des Autors/i);
});
