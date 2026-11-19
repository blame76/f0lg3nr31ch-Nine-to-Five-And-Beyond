// Metadata-only discovery. No changes to the visible chapter reader.
import {publicationEntries} from './publications.mjs';
const xml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const label = value => String(value).replace(/[\[\]\\]/g,'').replace(/\s+/g,' ').trim();
const isApproved = chapters => chapters.length > 0 && chapters.every(c=>c.status==='approved' && !!c.approved_by && /^\d{4}-\d{2}-\d{2}$/.test(c.approved_at||''));
const baseUrl = site => String(site).replace(/\/$/,'');

export function renderLlmsTxt({site,config,chapters,ready=false,chapterIndexReady=false,publicIndexReady=config.public_pages_indexing_approved===true,entries}){
 const lines=[
  '# f0lg3nr31ch – Nine to Five. And Beyond. (Folgenreich)','',
  '> Deutschsprachiges Literatur- und Rechercheprojekt von '+config.author_name+' über Arbeit, Technologie und Verantwortung.','',
  'Die Agentur f0lg3nr31ch, ihre Stellenanzeigen, Dienstleistungen und Figuren sind fiktiv.',
  'Roman, Satire, fiktive Interviews und reale Fachquellen sind unterschiedliche redaktionelle Ebenen.',
  'KI unterstützt den Schreibprozess; die redaktionelle Verantwortung liegt bei einem Menschen.',
  'Diese Datei bietet freiwillige Orientierung. Sie ist keine Lizenz und keine Erlaubnis zum Modelltraining.',''
 ];
 const rows=(entries??publicationEntries({config,chapters,ready,chapterIndexReady,publicIndexReady})).filter(p=>p.index);
 const sectionName={'Projekt':'Projekt und Kontext','Romanfolgen':'Freigegebene Romanfolgen'};
 const sections=[...new Set(rows.map(p=>p.section))];
 for(const section of sections){
  lines.push('## '+(sectionName[section]||section),'');
  for(const p of rows.filter(p=>p.section===section))lines.push('- ['+label(p.title)+']('+baseUrl(site)+'/'+p.slug+'): '+label(p.description));
  lines.push('');
 }
 if(rows.some(p=>p.slug==='intranet/365-tage-e-commerce/'))lines.push('## Alternative Textformate (keine zusätzlichen HTML-Seiten)','','Intranet-Textverzeichnis: '+baseUrl(site)+'/intranet/llms.txt','Jahresplaner als vollständiger UTF-8-Text: '+baseUrl(site)+'/intranet/365-tage-e-commerce/jahresplaner.txt','Markdown: '+baseUrl(site)+'/intranet/365-tage-e-commerce/jahresplaner.md','JSON: '+baseUrl(site)+'/intranet/365-tage-e-commerce/jahresplaner.json','');
 return lines.join('\n');
}

export function renderRss({site,config,chapters}) {
 if(!isApproved(chapters))throw new Error('RSS requires explicitly approved chapters');
 const base=baseUrl(site);
 const items=chapters.map(c=>'<item><title>'+xml(c.title)+'</title><link>'+xml(base+'/roman/'+c.id+'/')+'</link><guid isPermaLink="true">'+xml(base+'/roman/'+c.id+'/')+'</guid><description>'+xml(c.description+' (Fiktive Romanfolge)')+'</description></item>').join('');
 // No pubDate: editorial approval dates must not be presented as publication dates.
 return '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>'+xml(config.name+' – '+config.subtitle)+'</title><link>'+xml(base+'/roman/')+'</link><description>'+xml(config.description)+'</description><language>de-DE</language>'+items+'</channel></rss>\n';
}

export function renderNotFound() {
 return '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404 – Seite nicht gefunden</title></head><body><main><h1>Seite nicht gefunden</h1><p><a href="/">Zur Startseite</a></p></main></body></html>\n';
}

/**
 * A truthful negative capability declaration: the static reader exposes no
 * callable agents or tools. Both published specs permit empty entry arrays.
 * No fabricated MCP server, job offer, or API is advertised to score Lighthouse.
 */
export function renderArdManifest() {
 return JSON.stringify({entries:[]},null,2)+'\n';
}
export function renderLegacyAiCatalog() {
 return JSON.stringify({specVersion:'1.0',entries:[]},null,2)+'\n';
}
