/** One registry for discovery, not a substitute for editorial approval. */
import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import path from 'node:path';
import {readJson,escapeHtml} from './lib.mjs';
import {POSTS} from './partnerwelt-social.mjs';
const registry=readJson('config/publications.json');
const safeSlug=s=>s===''||/^(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)+$/.test(s);
export function publicationEntries({config,chapters,ready=false,publicIndexReady=config.public_pages_indexing_approved===true,chapterIndexReady=false}){
 const publicReady=!!config.site_url&&(ready||publicIndexReady);
 const chapterReady=!!config.site_url&&(ready||chapterIndexReady);
 const rows=[
  ...registry.site_pages.map(p=>({...p,index:publicReady&&p.index})),
  ...chapters.map(c=>({slug:'roman/'+c.id+'/',title:c.title,section:'Romanfolgen',description:c.description,type:'Chapter',feed:true,index:chapterReady&&c.status==='approved'&&!!c.approved_by&&/^\d{4}-\d{2}-\d{2}$/.test(c.approved_at||''),lastmod:c.modified_on})),
  ...POSTS.map(p=>({slug:'partnerwelt/share/'+p.id+'/',title:p.heading,section:'Social-Labor',description:p.summary+' Fiktives Lernbeispiel.',type:'CreativeWork',feed:true,index:publicReady}))
 ];
 const seen=new Set();
 for(const p of rows){
  if(!safeSlug(p.slug)||seen.has(p.slug)||!p.title||!p.description||typeof p.index!=='boolean')throw Error('Invalid publication: '+p.slug);
  if(p.lastmod!==undefined&&!/^\d{4}-\d{2}-\d{2}$/.test(p.lastmod))throw Error('Invalid lastmod: '+p.slug);
  seen.add(p.slug);
 }
 return rows;
}
const xml=escapeHtml;
const url=(site,slug)=>site.replace(/\/$/,'')+'/'+slug;
export function renderSitemap(site,entries){
 return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+entries.filter(p=>p.index).map(p=>'<url><loc>'+xml(url(site,p.slug))+'</loc>'+(p.lastmod?'<lastmod>'+xml(p.lastmod)+'</lastmod>':'')+'</url>').join('\n')+'\n</urlset>\n';
}
export function renderPublicationFeed(site,config,entries){
 const items=entries.filter(p=>p.index&&p.feed).map(p=>'<item><title>'+xml(p.title)+'</title><link>'+xml(url(site,p.slug))+'</link><guid isPermaLink="true">'+xml(url(site,p.slug))+'</guid><description>'+xml(p.description)+'</description><category>'+xml(p.section)+'</category></item>').join('\n');
 return '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>'+xml(config.name+' – '+config.subtitle)+'</title><link>'+xml(url(site,''))+'</link><description>'+xml(config.description)+'</description><language>de-DE</language>\n'+items+'\n</channel></rss>\n';
}
function filesIn(dir,base=dir){
 return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?filesIn(path.join(dir,e.name),base):[path.relative(base,path.join(dir,e.name)).split(path.sep).join('/')]);
}
function tags(html,tag){return [...html.matchAll(new RegExp('<'+tag+'\\b[^>]*>','gi'))].map(m=>m[0]);}
function attr(tag,name){
 const m=tag.match(new RegExp('\\s'+name+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))','i'));
 return m&&(m[1]??m[2]??m[3]);
}
function named(html,tag,key,value){return tags(html,tag).filter(t=>(attr(t,key)||'').toLowerCase()===value);}
const route=p=>p.slug+'index.html';
const noindex=p=>p.index?'index,follow':'noindex,follow';
function rawSchema(obj){return '<script type="application/ld+json">'+JSON.stringify(obj).replace(/</g,'\\u003c').replace(/[^\x00-\x7F]/g,ch=>'\\u'+ch.charCodeAt(0).toString(16).padStart(4,'0'))+'</script>';}
/** Enforce the central policy even for static, bundled, or newly generated HTML. */
export function synchronizePublications(dist,site,entries){
 for(const p of entries){
  const file=path.join(dist,route(p));
  if(!existsSync(file))throw Error('Publication missing from build: '+p.slug);
  let html=readFileSync(file,'utf8');
  const robots=named(html,'meta','name','robots');
  const canonical=named(html,'link','rel','canonical');
  if(robots.length>1||canonical.length>1)throw Error('Duplicate discovery metadata: '+p.slug);
  const meta='<meta name="robots" content="'+noindex(p)+'">';
  if(robots.length)html=html.replace(robots[0],meta);else html=html.replace('</head>',meta+'</head>');
  if(site){
   const link='<link rel="canonical" href="'+xml(url(site,p.slug))+'">';
   if(canonical.length)html=html.replace(canonical[0],link);else html=html.replace('</head>',link+'</head>');
   if(p.index&&!/application\/ld\+json/i.test(html)){
    const schema={'@context':'https://schema.org','@type':p.type,'@id':url(site,p.slug)+'#content',url:url(site,p.slug),name:p.title,description:p.description,inLanguage:'de'};
    if(p.slug) schema.isPartOf={'@type':'WebSite','@id':url(site,'')+'#website',name:'f0lg3nr31ch',url:url(site,'')};
    html=html.replace('</head>',rawSchema(schema)+'</head>');
   }
  }
  writeFileSync(file,html,'utf8');
 }
 // Unknown HTML requires an explicit policy instead of silently disappearing.
 const known=new Set([...entries.map(route),...registry.excluded_html]);
 for(const f of filesIn(dist))if(f.endsWith('.html')&&!known.has(f))throw Error('Unregistered HTML publication: '+f+' – add a discovery policy in config/publications.json');
}
export function auditPublications(dist,site,entries){
 const errors=[],allowed=entries.filter(p=>p.index);
 const read=f=>readFileSync(path.join(dist,f),'utf8');
 const sitemap=allowed.length?read('sitemap.xml'):'';
 const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
 const expected=allowed.map(p=>url(site,p.slug));
 if(JSON.stringify(urls.slice().sort())!==JSON.stringify(expected.slice().sort()))errors.push('Sitemap and publication registry differ');
 const llms=read('llms.txt');
 const llmsUrls=[...llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(m=>m[1]);
 if(JSON.stringify(llmsUrls.slice().sort())!==JSON.stringify(expected.slice().sort()))errors.push('llms.txt and publication registry differ');
 const bySlug=new Map(entries.map(p=>[p.slug,p]));
 const graph=new Map();
 for(const p of entries){
  const html=read(route(p));
  const r=named(html,'meta','name','robots'),c=named(html,'link','rel','canonical');
  if(r.length!==1||attr(r[0],'content')!==noindex(p))errors.push('Robots mismatch: '+p.slug);
  if(site&&(c.length!==1||attr(c[0],'href')!==url(site,p.slug)))errors.push('Canonical mismatch: '+p.slug);
  for(const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
   try{
    const json=JSON.parse(match[1]);
    if(/"(?:JobPosting|LocalBusiness)"/.test(JSON.stringify(json)))errors.push('Misleading fictional offer schema: '+p.slug);
   }catch{errors.push('Invalid JSON-LD: '+p.slug);}
  }
  const linked=[];
  if(site)for(const tag of tags(html,'a')){
   const href=attr(tag,'href');
   if(!href||href.startsWith('#'))continue;
   let target;try{target=new URL(href.replace(/&amp;/g,'&'),url(site,p.slug));}catch{continue;}
   if(target.origin!==new URL(site).origin)continue;
   const pathname=target.pathname.slice(1).replace(/(?:^|\/)index\.html$/,'/');
   const slug=pathname==='/'?'':pathname.endsWith('/')?pathname:pathname+'/';
   if(bySlug.has(slug))linked.push(slug);
  }
  graph.set(p.slug,linked);
 }
 const reached=new Set(),queue=[''];
 while(queue.length){const p=queue.shift();if(reached.has(p))continue;reached.add(p);queue.push(...(graph.get(p)||[]));}
 for(const p of allowed)if(!reached.has(p.slug))errors.push('Indexable page not linked from homepage: '+p.slug);
 if(allowed.length&& !read('robots.txt').includes('Sitemap: '+url(site,'sitemap.xml')))errors.push('robots.txt lacks sitemap discovery');
 if(allowed.some(p=>p.feed)){
  const feed=read('feed.xml');
  for(const p of allowed.filter(p=>p.feed))if(!feed.includes('<guid isPermaLink="true">'+url(site,p.slug)+'</guid>'))errors.push('Missing feed item: '+p.slug);
 }
 if(errors.length)throw Error(errors.join('\n'));
 return {indexable:allowed.length,excluded:entries.length-allowed.length,registered:entries.length};
}
