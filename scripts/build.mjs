import {readFileSync,writeFileSync,mkdirSync,rmSync,cpSync} from 'node:fs';
import path from 'node:path';
import {root,readJson,escapeHtml,escapeMeta,normUrl,absoluteUrl,validateManifest,markdownToHtml} from './lib.mjs';
import {about,imprint,privacy,license} from './pages.mjs';
import {renderCampaignImage} from './social-image.mjs';

const config=readJson('config/site.json');
const manifest=readJson('content/chapters/index.json');
const errors=validateManifest(config,manifest);
if(errors.length) throw new Error(errors.join('\n'));
const site=normUrl(config.site_url);
const ready=!!site && config.release_approved===true && config.legal_reviewed_for_launch===true && manifest.chapters.length>0 && manifest.chapters.every(c=>c.status==='approved');
const dist=path.join(root,'dist');
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
cpSync(path.join(root,'public'),dist,{recursive:true});
const abs=p=>absoluteUrl(site,p);
const e=escapeHtml, em=escapeMeta;
function output(f,body){const target=path.join(dist,f);mkdirSync(path.dirname(target),{recursive:true});writeFileSync(target,body,'utf8');}
function structured(obj){return '<script type="application/ld+json">'+JSON.stringify(obj).replace(/</g,'\\u003c')+'</script>';}
function page({title,description=config.description,slug='',type='website',body,schema=null,ogTitle=null,ogDescription=null,ogImage='share-preview.png',ogAlt='f0lg3nr31ch – Nine to Five. And Beyond. Fiktiver Agenturroman und Experiment.'}){
 const url=abs(slug),fullTitle=title+' | f0lg3nr31ch';
 const head=[
 '<meta charset="utf-8">',
 '<meta name="viewport" content="width=device-width, initial-scale=1">',
 '<meta name="robots" content="'+(ready?'index,follow':'noindex,follow')+'">',
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
 if(ready && schema) head.push(structured(schema));
 return '<!doctype html><html lang="de"><head><title>'+em(fullTitle)+'</title>'+head.join('')+'</head><body>'+
 '<a class="skip" href="#main">Zum Inhalt springen</a>'+
 '<header class="site-header"><div class="wrap header-inner"><a class="brand" href="/">f0lg3nr31ch<span class="tagline">Nine to Five. And Beyond.</span></a><nav aria-label="Hauptnavigation"><a href="/roman/">Roman</a><a href="/experiment/">Über das Projekt</a></nav></div></header>'+
 '<main id="main" class="wrap">'+body+'</main>'+
 '<footer class="site-footer"><div class="wrap"><p class="footer-disclosure">Fiktive Agentur · KI-gestützter Roman · öffentliches SEO-/GEO-Experiment · <a href="/experiment/">Hintergründe</a></p><div class="footer-inner"><p>f0lg3nr31ch – Nine to Five. And Beyond. · Die Agentur ist erfunden.</p><nav aria-label="Rechtliches"><a href="/experiment/">Über</a><a href="/lizenz/">Lizenz</a><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a></nav></div></div></footer></body></html>';
}
const list=manifest.chapters;
for(const chapter of list)output(chapter.campaign.image,renderCampaignImage(chapter));
const notices=ready?'':'<aside class="notice" aria-label="Veröffentlichungsstand"><strong>Öffentliche Vorschau – keine endgültige Veröffentlichung.</strong> Diese Texte sind Release-Kandidaten. Die finale Autoren- und Datenschutzfreigabe steht noch aus.</aside>';
const indexItems=list.map((c,i)=>'<li><a href="/roman/'+e(c.id)+'/">'+e(c.title)+'</a><small>Folge '+(i+1)+' · '+e(c.description)+'</small><small>Fiktive Agenturkampagne: '+e(c.campaign.headline)+' '+e(c.campaign.subheadline)+'</small></li>').join('');
const items='<ol class="list">'+indexItems+'</ol>';
const book={'@context':'https://schema.org','@type':'Book',name:'f0lg3nr31ch – Nine to Five. And Beyond.',inLanguage:'de',genre:'Roman',author:{'@type':'Person',name:config.author_name},isAccessibleForFree:true};
output('index.html',page({title:'Nine to Five. And Beyond.',body:'<section class="hero"><p class="eyebrow">Roman · Fiktion · Experiment</p><h1>f0lg3nr31ch</h1><p class="lead">Nine to Five. And Beyond.</p><p>Ein fortlaufender Agenturroman über Menschen, Arbeit und die Folgen ihrer Entscheidungen.</p></section><section><h2>Die Geschichten</h2>'+items+'<p><a href="/experiment/">Wie entsteht dieser Roman?</a></p></section>'+notices,schema:{'@context':'https://schema.org','@type':'WebSite',name:config.name,alternateName:'Folgenreich',url:site,description:config.description}}));
output('roman/index.html',page({title:'Alle Folgen',slug:'roman/',body:'<section class="hero"><p class="eyebrow">Roman</p><h1>Alle Folgen</h1><p>Die Agentur ist Fiktion. Die Texte stehen bis zur Abnahme in einer gekennzeichneten Vorschau.</p></section>'+items+notices,schema:book}));
for(let i=0;i<list.length;i++){
 const c=list[i],raw=readFileSync(path.join(root,c.path),'utf8').replace(/^# [^\n]+\n+/,'');
 const prev=i?'<a href="/roman/'+e(list[i-1].id)+'/">← Vorherige Folge</a>':'';
 const next=i+1<list.length?'<a href="/roman/'+e(list[i+1].id)+'/">Nächste Folge →</a>':'';
 const chapter={'@context':'https://schema.org','@type':'Chapter',name:c.title,description:c.description,inLanguage:'de',url:abs('roman/'+c.id+'/'),isPartOf:{'@type':'Book',name:book.name},author:{'@type':'Person',name:config.author_name}};
 const campaign=c.campaign;
 const bridge='<aside class="campaign-bridge" aria-label="Fiktive Agenturkommunikation"><p class="eyebrow">Aus der fiktiven Agentur · '+e(campaign.category)+'</p>'+
 '<h2>'+e(campaign.headline)+'</h2><p class="campaign-subline">'+e(campaign.subheadline)+'</p>'+
 '<p>'+e(campaign.promise)+'</p><p class="campaign-context">'+e(campaign.context)+'</p>'+
 '<p class="campaign-disclaimer">Fiktive Agenturkampagne aus dem Roman – keine echte Stellenanzeige und kein buchbares Dienstleistungsangebot.</p></aside>';
 const body='<article class="reader" id="romantext" lang="de" aria-labelledby="chapter-title">'+
 '<header class="chapter-heading"><p class="meta">Folge '+(i+1)+' · Roman</p><h1 id="chapter-title">'+e(c.title)+'</h1></header>'+
 '<div class="chapter-text">'+markdownToHtml(raw)+'</div></article>'+
 '<nav class="pager" aria-label="Folgen-Navigation">'+prev+next+'</nav>'+
 '<div class="afterword" aria-label="Hintergründe zur Folge">'+bridge+notices+'</div>';
 output('roman/'+c.id+'/index.html',page({title:campaign.seo_title,description:campaign.seo_description,ogTitle:campaign.social_title,ogDescription:campaign.social_description,ogImage:campaign.image,ogAlt:campaign.image_alt,slug:'roman/'+c.id+'/',type:'chapter',body,schema:chapter}));
}
for(const [slug,title,body] of [['experiment','Über das Experiment',about],['impressum','Impressum',imprint],['datenschutz','Datenschutz',privacy],['lizenz','Lizenz und Urheberschaft',license]]){
 output(slug+'/index.html',page({title,slug:slug+'/',body}));
}
if(ready){
 const slugs=['','roman/',...list.map(c=>'roman/'+c.id+'/'),'experiment/','impressum/','datenschutz/','lizenz/'];
 output('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+slugs.map(s=>'<url><loc>'+e(abs(s))+'</loc></url>').join('')+'</urlset>');
}
output('robots.txt','User-agent: *\nAllow: /\n'+(ready?'Sitemap: '+abs('sitemap.xml')+'\n':''));
console.log('Pages build finished: '+list.length+' chapters; SEO index '+(ready?'ENABLED':'DISABLED')+'; URL '+(site||'not set'));
