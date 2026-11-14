import {readFileSync,writeFileSync,mkdirSync,rmSync,cpSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {root,readJson,escapeHtml,escapeMeta,normUrl,absoluteUrl,validateManifest,markdownToHtml} from './lib.mjs';
import {about,imprint,privacy,license} from './pages.mjs';
import {renderCampaignImage} from './social-image.mjs';
import {renderResearchChapter} from './references.mjs';
import {renderAdminBookAd} from './book-ad.mjs';
import {renderLlmsTxt,renderRss,renderNotFound,renderArdManifest,renderLegacyAiCatalog} from './discovery.mjs';
import {installPartnerweltRedesign} from './partnerwelt-redesign.mjs';
import {installPartnerweltSocial,SOCIAL_SLUGS} from './partnerwelt-social.mjs';

const config=readJson('config/site.json');
const manifest=readJson('content/chapters/index.json');
const errors=validateManifest(config,manifest);
if(errors.length) throw new Error(errors.join('\n'));
const site=normUrl(config.site_url);
const ready=!!site && config.release_approved===true && config.legal_reviewed_for_launch===true && manifest.chapters.length>0 && manifest.chapters.every(c=>c.status==='approved');
// Indexing decisions are independent of the legal/full-release gate.
const publicIndexReady=!!site && config.public_pages_indexing_approved===true;
const chapterIndexReady=!!site && config.published_chapters_indexing_approved===true;
const dist=path.join(root,'dist');
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
cpSync(path.join(root,'public'),dist,{recursive:true});

/** Expand the versioned, self-contained fictional Partnerwelt without dependencies. */
function installPartnerwelt() {
 const release='2026-11-05', expected='80cea8d2fcd53374cc0d3fa472604432bccecdaffca6c120e3f90b35fe591b29';
 const encoded=readFileSync(path.join(root,'bundles','partnerwelt-'+release+'.tar.gz.base64'),'utf8');
 const compressed=Buffer.from(encoded.replace(/\s/g,''),'base64');
 if(createHash('sha256').update(compressed).digest('hex')!==expected) throw new Error('Partnerwelt release archive failed integrity check');
 const archive=gunzipSync(compressed);
 let offset=0, count=0;
 while(offset+512<=archive.length){
  const header=archive.subarray(offset,offset+512);
  const name=header.toString('utf8',0,100).split('\0')[0];
  if(!name)break;
  const size=parseInt(header.toString('ascii',124,136).replace(/\0/g,'').trim(),8);
  const type=header[156];
  if(!name.startsWith('partnerwelt/') || path.posix.normalize(name)!==name || name.includes('..') ||
     type!==48 || !Number.isSafeInteger(size) || size<0 || offset+512+size>archive.length)
   throw new Error('Invalid Partnerwelt release entry: '+name);
  const dest=path.join(dist,...name.split('/'));
  mkdirSync(path.dirname(dest),{recursive:true});
  writeFileSync(dest,archive.subarray(offset+512,offset+512+size));
  offset+=512+Math.ceil(size/512)*512;
  count++;
 }
 if(count!==27)throw new Error('Incomplete Partnerwelt release: '+count+' files');
 console.log('Partnerwelt '+release+': '+count+' static files installed');
}
installPartnerwelt();
// The reviewed visual layer is applied after the integrity-checked static bundle.
// It only edits the fictional support company, not the reader or other partner pages.
installPartnerweltRedesign(dist);
// Public, individually shareable fiction-marked Social-Labor and WCAG contrast correction.
installPartnerweltSocial(dist);

 // Separate fictional landing page; copied from public/ before bundle installation.
const echtJetztSlug='partnerwelt/echt-jetzt/';
const partnerIndex=path.join(dist,'partnerwelt','index.html');
const partnerHtml=readFileSync(partnerIndex,'utf8');
const partnerNavEnd='</nav></header>';
if(!partnerHtml.includes(partnerNavEnd))throw new Error('Missing Partnerwelt navigation for ECHT JETZT');
writeFileSync(partnerIndex,partnerHtml.replace(partnerNavEnd,'<a href="/partnerwelt/echt-jetzt/">ECHT JETZT?!</a>'+partnerNavEnd),'utf8');
const echtJetztPath=path.join(dist,echtJetztSlug,'index.html');
if(!(ready || publicIndexReady)){
 const html=readFileSync(echtJetztPath,'utf8');
 writeFileSync(echtJetztPath,html.replace('content="index,follow"','content="noindex,follow"'),'utf8');
}else{
 const partnerSitemap=path.join(dist,'partnerwelt','sitemap.xml');
 const xml=readFileSync(partnerSitemap,'utf8');
 if(!xml.includes('</urlset>'))throw new Error('Invalid Partnerwelt sitemap');
 writeFileSync(partnerSitemap,xml.replace('</urlset>','<url><loc>'+absoluteUrl(site,echtJetztSlug)+'</loc></url></urlset>'),'utf8');
}


const abs=p=>absoluteUrl(site,p);
const e=escapeHtml, em=escapeMeta;
function output(f,body){const target=path.join(dist,f);mkdirSync(path.dirname(target),{recursive:true});writeFileSync(target,body,'utf8');}
function structured(obj){
 // Keep social-crawler head ASCII-safe, including JSON-LD chapter titles.
 // Unicode escapes preserve the exact structured-data string values.
 const json=JSON.stringify(obj).replace(/</g,'\\u003c').replace(/[^\x00-\x7F]/g,ch=>'\\u'+ch.charCodeAt(0).toString(16).padStart(4,'0'));
 return '<script type="application/ld+json">'+json+'</script>';
}
function page({title,description=config.description,slug='',type='website',body,schema=null,ogTitle=null,ogDescription=null,ogImage='share-preview.png',ogAlt='f0lg3nr31ch – Nine to Five. And Beyond. Fiktiver Agenturroman und Experiment.',indexApprovedChapter=false}){
 const url=abs(slug),fullTitle=title+' | f0lg3nr31ch';
 const head=[
 '<meta charset="utf-8">',
 '<meta name="viewport" content="width=device-width, initial-scale=1">',
 '<meta name="robots" content="'+(ready || (publicIndexReady && type!=='chapter') || (chapterIndexReady && type==='chapter' && indexApprovedChapter)?'index,follow':'noindex,follow')+'">',
 '<meta name="description" content="'+em(description)+'">',
 '<meta property="og:site_name" content="'+em('f0lg3nr31ch – Nine to Five. And Beyond.')+'">',
 '<meta property="og:type" content="'+(type==='chapter'?'article':'website')+'">',
 '<meta property="og:title" content="'+em(ogTitle||fullTitle)+'">',
 '<meta property="og:description" content="'+em(ogDescription||description)+'">',
 '<meta property="og:locale" content="de_DE">',
 '<meta name="twitter:title" content="'+em(ogTitle||fullTitle)+'">',
 '<meta name="twitter:description" content="'+em(ogDescription||description)+'">',
 '<meta name="twitter:card" content="summary_large_image">',
 ...(type==='chapter'?['<meta name="author" content="'+em(config.author_name)+'">']:[]),
 ...(ready?['<link rel="alternate" type="application/rss+xml" title="Romanfolgen" href="'+em(abs('feed.xml'))+'">']:[]),
 '<link rel="stylesheet" href="/style.css">'
 ];
 if(site){
   head.push('<link rel="canonical" href="'+em(url)+'">');
   head.push('<meta property="og:url" content="'+em(url)+'">');
   head.push('<meta property="og:image" content="'+em(abs(ogImage))+'">');
   head.push('<meta property="og:image:secure_url" content="'+em(abs(ogImage))+'">');
   head.push('<meta property="og:image:type" content="image/png">');
   head.push('<meta property="og:image:width" content="1200">');
   head.push('<meta property="og:image:height" content="630">');
   head.push('<meta property="og:image:alt" content="'+em(ogAlt)+'">');
   head.push('<meta name="twitter:image" content="'+em(abs(ogImage))+'">');
 }
 if(site) head.push('<link rel="describedby" type="text/plain" href="'+em(abs('llms.txt'))+'">');
 if(schema && (ready || (chapterIndexReady && type==='chapter' && indexApprovedChapter))) head.push(structured(schema));
 return '<!doctype html><html lang="de"><head><title>'+em(fullTitle)+'</title>'+head.join('')+'</head><body>'+
 '<a class="skip" href="#main">Zum Inhalt springen</a>'+
 '<header class="site-header"><div class="wrap header-inner"><a class="brand" href="/">f0lg3nr31ch<span class="tagline">Nine to Five. And Beyond.</span></a><nav aria-label="Hauptnavigation"><a href="/roman/">Roman</a><a href="/experiment/">Über das Projekt</a></nav></div></header>'+
 '<main id="main" class="wrap">'+body+'</main>'+
 '<footer class="site-footer"><div class="wrap"><p class="footer-disclosure">Ein Roman über eine fiktive Agentur · <a href="/experiment/">Über das Projekt</a></p><div class="footer-inner"><p>f0lg3nr31ch – Nine to Five. And Beyond.</p><nav aria-label="Rechtliches"><a href="/experiment/">Über</a><a href="/lizenz/">Lizenz</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></nav></div></div></footer></body></html>';
}
const list=manifest.chapters;
for(const chapter of list)output(chapter.campaign.image,renderCampaignImage(chapter));
const indexItems=list.map((c,i)=>'<li><a href="/roman/'+e(c.id)+'/">'+e(c.title)+'</a><small>Folge '+(i+1)+' · '+e(c.description)+'</small><small>'+((c.campaign.recipe_card||c.campaign.chocolate_card)?'Fiktives Rezept: ':'Fiktive Agenturkampagne: ')+e(c.campaign.headline)+' '+e(c.campaign.subheadline)+'</small></li>').join('');
const items='<ol class="list">'+indexItems+'</ol>';
const book={'@context':'https://schema.org','@type':'Book','@id':abs('roman/#book'),url:abs('roman/'),name:'f0lg3nr31ch – Nine to Five. And Beyond.',inLanguage:'de',genre:'Roman',author:{'@type':'Person',name:config.author_name},isAccessibleForFree:true};
output('index.html',page({title:'Nine to Five. And Beyond.',body:'<section class="hero"><p class="eyebrow">Fortsetzungsroman</p><h1>f0lg3nr31ch</h1><p class="lead">Nine to Five. And Beyond.</p><p>Ein fortlaufender Agenturroman über Menschen, Arbeit und die Folgen ihrer Entscheidungen.</p></section><section><h2>Die Geschichten</h2>'+items+'<p><a href="/experiment/">Wie entsteht dieser Roman?</a></p></section>',schema:{'@context':'https://schema.org','@type':'WebSite','@id':abs('#website'),name:config.name,alternateName:'Folgenreich',url:site+'/',inLanguage:'de',description:config.description}}));
output('roman/index.html',page({title:'Alle Folgen',slug:'roman/',body:'<section class="hero"><p class="eyebrow">Roman</p><h1>Alle Folgen</h1><p>Geschichten aus dem Alltag einer fiktiven Agentur.</p></section>'+items,schema:book}));
for(let i=0;i<list.length;i++){
 const c=list[i],raw=readFileSync(path.join(root,c.path),'utf8').replace(/^# [^\n]+\n+/,'');
 let research=c.research.status==='linked' ? renderResearchChapter(raw,readJson(c.research.path),c.id) : {chapterHtml:markdownToHtml(raw),notesHtml:''};
 // Reader exception requested by the author: no academic sources or outbound links
 // for this private-life miniaturе, only a short weekend sign-off.
 if(c.id==='der-t-rex-effekt'){
  if(c.research.status!=='none') throw new Error('Freitagsmorgen braucht Quellenentscheidung none');
  research={...research,notesHtml:'<section class="weekend-note" aria-label="Wochenendgruß"><p>Wochenende! Offline! Make THE WORLD a BETTER place For CHILDREN!</p></section>'};
 }
 // A static, clearly separated fictional ad replaces the removed kitchen
 // dialogue only in episode 04. The novel prose remains an independent text.
 const adAnchor='<p>Leon nahm drei Pistazien. Der Admin schraubte das Gefäß zu und schlug sein Buch wieder auf.</p>';
 let chapterHtml=c.id==='der-zweite-tab'
  ? (()=>{if(!research.chapterHtml.includes(adAnchor))throw new Error('Admin book-ad placement anchor missing');
     return research.chapterHtml.replace(adAnchor,adAnchor+renderAdminBookAd());})()
  : research.chapterHtml;
 // Explicitly labelled fictional advertising is a separate reader-layer insertion;
 // neither the approved prose nor research markers are rewritten.
 if(c.id==='verfuegbar'){
   const timeAnchor='<p>Noch gut drei Stunden.</p>';
   if(!chapterHtml.includes(timeAnchor))throw new Error('Verfügbar: ad anchor missing');
   const fictionalAd='<aside class="fictional-sla-ad" aria-labelledby="fictional-sla-heading">'+
    '<p class="eyebrow">Anzeige · fiktive Werbung aus der Partnerwelt</p>'+
    '<h2 id="fictional-sla-heading">Vier Stunden. Zwei Uhren.</h2>'+
    '<p>Vier Stunden Reaktionszeit? Das hängt davon ab, welche Uhr läuft. Ein kurzer, erklärender Social-Post einer erfundenen Servicefirma.</p>'+
    '<p><a href="/partnerwelt/share/vier-stunden-zwei-uhren/">Anzeige ansehen und die zwei Uhren vergleichen →</a></p>'+
    '<p class="fictional-ad-note">Fiktive Kampagne aus f0lg3nr31ch. Keine echte Serviceleistung.</p></aside>';
   chapterHtml=chapterHtml.replace(timeAnchor,timeAnchor+fictionalAd);
 }
 const prev=i?'<a href="/roman/'+e(list[i-1].id)+'/">← Vorherige Folge</a>':'';
 const next=i+1<list.length?'<a href="/roman/'+e(list[i+1].id)+'/">Nächste Folge →</a>':'';
 const chapter={'@context':'https://schema.org','@type':'Chapter','@id':abs('roman/'+c.id+'/#chapter'),name:c.title,description:c.description,inLanguage:'de',url:abs('roman/'+c.id+'/'),position:i+1,isPartOf:{'@type':'Book','@id':book['@id'],name:book.name,url:book.url},author:{'@type':'Person',name:config.author_name}};
 const campaign=c.campaign;
 const bridge=campaign.bingo_card
 ? '<aside class="campaign-bridge" aria-label="Fiktive Buzzword-Bingo-Karte"><p class="eyebrow">Anzeige · Fiktive Workshop-Karte · Romanfolge '+(i+1)+'</p>'+
   '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
   '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
   '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman. Die Bingo-Karte ist eine Satire, kein reales Workshop-Angebot.</p></aside>'
 : campaign.event_card
 ? '<aside class="campaign-bridge" aria-label="Fiktive Veranstaltung: Ideen auf Probe"><p class="eyebrow">Anzeige · Fiktive Veranstaltung · Romanfolge '+(i+1)+'</p>'+
   '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
   '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
   '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman: Diese Veranstaltung ist erfunden. Keine Anmeldung und keine Tickets.</p></aside>'
 : campaign.bakery_card
 ? '<aside class="campaign-bridge" aria-label="Fiktive Bäckereianzeige"><p class="eyebrow">Anzeige · Fiktive Bäckerei · Romanfolge '+(i+1)+'</p>'+
   '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p><p>'+e(campaign.promise)+'</p><p>'+e(campaign.context)+'</p>'+
   '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman. Kein echtes Bäckereiangebot, keine bestellbaren Waren.</p></aside>'
 : campaign.chocolate_card
 ? '<aside class="campaign-bridge" aria-label="Fiktive Schokokuchen-Rezeptkarte"><p class="eyebrow">Rezept · Fiktive Karte · Romanfolge '+(i+1)+'</p>'+
   '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
   '<p>Für eine Form von etwa 20 cm: 200 g Zartbitterschokolade, 150 g Butter, 140 g Zucker, 3 Eier, 120 g Mehl, 1 TL Backpulver, 1 Prise Salz.</p>'+
   '<p>Backofen auf 175 °C Ober-/Unterhitze vorheizen. Schokolade und Butter vorsichtig schmelzen, kurz abkühlen lassen. Eier und Zucker verrühren, Schokoladenmasse dazugeben, dann Mehl, Backpulver und Salz kurz unterheben. In eine gefettete Form füllen und etwa 25–30 Minuten backen. Stäbchenprobe: Für einen saftigen Kuchen dürfen feuchte Krümel haften, aber kein roher Teig. Vor dem Anschneiden abkühlen lassen.</p>'+
   '<p class="campaign-context">'+e(campaign.context)+'</p>'+
   '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman. Das Rezept ist eine begleitende, nicht kommerzielle Leseidee.</p></aside>'
 : campaign.calendar_card
 ? '<aside class="campaign-bridge" aria-label="Fiktive Familienkalenderwerbung"><p class="eyebrow">Anzeige · Fiktiver Familienkalender · Romanfolge '+(i+1)+'</p>'+
   '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
   '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
   '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman. 100 % Rabatt ist ein Scherz – kein echtes Produkt, keine Bestellung, kein Rabattcode.</p></aside>'
 : campaign.streaming_card
 ? '<aside class="campaign-bridge" aria-label="Fiktive Streamingwerbung: prscnm"><p class="eyebrow">Anzeige · Fiktive Streamingkampagne · Romanfolge '+(i+1)+'</p>'+
   '<h2>'+e('prscnm – Es wird wieder spät.')+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
   '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
   '<p><a href="/partnerwelt/prscnm/">Fiktiven Streamingkanal prscnm entdecken →</a></p>'+
   '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman – der Kanal, die Serien und die Angebote sind erfunden; es gibt keine Abos.</p></aside>'
 : campaign.recipe_card
 ? '<aside class="campaign-bridge" aria-label="Rezept aus der fiktiven Admin-Küche"><p class="eyebrow">Aus der fiktiven Admin-Küche · Romanfolge '+(i+1)+'</p>'+
 '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
 '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
 '<p class="campaign-disclaimer">Fiktives Rezeptmotiv aus dem Agenturroman. Die Agentur und der Admin sind erfunden.</p></aside>'
 : '<aside class="campaign-bridge" aria-label="Fiktive Agenturkommunikation"><p class="eyebrow">Aus der fiktiven Agentur · '+e(campaign.category)+'</p>'+
 '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
 '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
 '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman – keine echte Stellenanzeige und kein buchbares Dienstleistungsangebot.</p></aside>';
 const travelAd=c.id==='die-kleine-delle'
  ? '<aside class="fictional-travel-ad" aria-label="Fiktive Last-Minute-Reiseanzeige nach China">'+
    '<p class="eyebrow">Anzeige · Fiktives Reisebüro</p>'+
    '<p class="travel-brand">FERNWEHFORMULAR</p>'+
    '<h2>Last Minute. China.</h2>'+
    '<p class="travel-kicker">Morgen woanders.</p>'+
    '<p>Großstädte, Landschaften und ein ganz anderer Alltag. Manchmal beginnt die Reise mit einem freien Termin im Kalender.</p>'+
    '<p class="campaign-disclaimer">Fiktive Reisebüroanzeige aus f0lg3nr31ch. Kein reales Reiseangebot, keine verfügbaren Flüge oder Buchungsmöglichkeit.</p></aside>'
  : '';
 const body='<article class="reader" id="romantext" lang="de" aria-labelledby="chapter-title">'+
 '<header class="chapter-heading"><p class="meta">Folge '+(i+1)+' · Roman</p><h1 id="chapter-title">'+e(c.title)+'</h1></header>'+
 '<div class="chapter-text">'+chapterHtml+'</div></article>'+
 '<nav class="pager" aria-label="Folgen-Navigation">'+prev+next+'</nav>'+research.notesHtml+
 '<div class="afterword" aria-label="Hintergründe zur Folge">'+bridge+travelAd+'</div>';
 output('roman/'+c.id+'/index.html',page({title:campaign.seo_title,description:campaign.seo_description,ogTitle:campaign.social_title,ogDescription:campaign.social_description,ogImage:campaign.image,ogAlt:campaign.image_alt,slug:'roman/'+c.id+'/',type:'chapter',indexApprovedChapter:c.status==='approved',body,schema:chapter}));
}
for(const [slug,title,body] of [['experiment','Über das Experiment',about],['impressum','Impressum',imprint],['datenschutz','Datenschutz',privacy],['lizenz','Lizenz und Urheberschaft',license]]){
 output(slug+'/index.html',page({title,slug:slug+'/',body}));
}
if(ready || publicIndexReady || chapterIndexReady){
 // Only indexable URLs belong in the sitemap; no unapproved chapter URLs.
 const slugs=['','roman/',...((ready || chapterIndexReady)?list.filter(c=>c.status==='approved').map(c=>'roman/'+c.id+'/'):[]),'experiment/','impressum/','datenschutz/','lizenz/','partnerwelt/','partnerwelt/palettenpalaver/','partnerwelt/belegballett/','partnerwelt/warteschleifenwunder/',...SOCIAL_SLUGS,...((ready || publicIndexReady)?[echtJetztSlug]:[])];
 output('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+slugs.map(s=>'<url><loc>'+e(abs(s))+'</loc></url>').join('')+'</urlset>');
}
if(ready)output('feed.xml',renderRss({site,config,chapters:list}));
output('robots.txt','User-agent: *\nAllow: /\n'+(ready || publicIndexReady?'Sitemap: '+abs('sitemap.xml')+'\n':''));
output('llms.txt',renderLlmsTxt({site,config,chapters:list,ready,publicIndexReady,chapterIndexReady}));
output('.well-known/ard.json',renderArdManifest());
output('.well-known/ai-catalog.json',renderLegacyAiCatalog());
output('404.html',renderNotFound());
console.log('Pages build finished: '+list.length+' chapters; approved chapter indexing '+(ready || chapterIndexReady?'ENABLED':'DISABLED')+'; full release '+(ready?'ENABLED':'PENDING')+'; URL '+(site||'not set'));
