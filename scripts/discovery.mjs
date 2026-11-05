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
  'Diese Datei bietet eine freiwillige Orientierung. Sie ist keine Lizenz und keine Erlaubnis zum Modelltraining.',
  ''
 ];
 const base=baseUrl(site);
 lines.push('## Projekt und Kontext','',
  '- [Startseite]('+base+'/): Offizielle Projektseite und Einstieg in die fiktive Romanwelt.',
  '- [Romanübersicht]('+base+'/roman/): Reihenfolge und kurze Einordnung der Folgen.',
  '- [Partnerwelt]('+base+'/partnerwelt/): Drei vollständig fiktive Dienstleister mit fachlich plausiblen Beispielen zu Fulfillment, Commerce Operations und Kundenservice; Teamabbildungen sind KI-generiert.',
  '- [Social-Labor]('+base+'/partnerwelt/share/): Sechs teilbare fiktive Social-Media-Beiträge, eigene Social-Vorschauen und kompakte How-to-Erklärungen zu Hook, Beleg und CTA; KI-unterstützt gestaltete Bilder.',
  '- [Über das Experiment]('+base+'/experiment/): Entstehung, KI-Einsatz und Fiktionskennzeichnung.',
  '- [Lizenz und Urheberschaft]('+base+'/lizenz/): Bedingungen und Grenzen der Nachnutzung.',
  '');
 if(ready && isApproved(chapters)){
  lines.push('## Freigegebene Romanfolgen','');
  for(const c of chapters)lines.push('- ['+label(c.title)+']('+base+'/roman/'+c.id+'/): Romanfolge '+c.position);
  lines.push('');
 } else lines.push('Die Kapitel sind bereits öffentlich lesbar, jedoch noch nicht zur Suchmaschinenindexierung freigegeben. Deshalb werden hier keine einzelnen Kapitel-URLs empfohlen.','');
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
