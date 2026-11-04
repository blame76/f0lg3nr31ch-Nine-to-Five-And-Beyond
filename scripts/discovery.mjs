// Metadata-only discovery. No changes to the visible chapter reader.
const xml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const label = value => String(value).replace(/[\[\]\\]/g,'').replace(/\s+/g,' ').trim();
const isApproved = chapters => chapters.length > 0 && chapters.every(c=>c.status==='approved' && !!c.approved_by && /^\d{4}-\d{2}-\d{2}$/.test(c.approved_at||''));
const baseUrl = site => String(site).replace(/\/$/,'');

export function renderLlmsTxt({site,config,chapters,ready}) {
 const lines=[
  '# f0lg3nr31ch – Nine to Five. And Beyond.',
  '',
  '> Deutschsprachiger Fortsetzungsroman von '+config.author_name+' über Menschen, Arbeit und die Folgen ihrer Entscheidungen.',
  '',
  'Die Agentur f0lg3nr31ch, ihre Stellenanzeigen und ihre Dienstleistungen sind fiktiv.',
  'KI unterstützt den Schreibprozess; die redaktionelle Verantwortung liegt bei einem Menschen.',
  'Diese Datei ist eine Orientierung für Maschinen und keine Lizenz oder Trainingserlaubnis.',
  ''
 ];
 if(ready && isApproved(chapters)){
  const base=baseUrl(site);
  lines.push('## Roman','','- [Alle Folgen]('+base+'/roman/)');
  for(const c of chapters)lines.push('- ['+label(c.title)+']('+base+'/roman/'+c.id+'/): Romanfolge '+c.position);
  lines.push('','## Hintergrund','','- [Über das Experiment]('+base+'/experiment/)','- [Lizenz und Urheberschaft]('+base+'/lizenz/)','');
 } else lines.push('Für die Suchmaschinenindexierung sind derzeit keine Romanfolgen freigegeben.','');
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
