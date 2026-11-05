/**
 * Public Social Lab for the fictional Partnerwelt.
 * Static share landing pages, independently renderable previews, explicit
 * fiction/AI labels, and progressive native share/clipboard actions.
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

export const POSTS=[
 {
  id:'service-beginnt-vor-antwort',company:'Warteschleifenwunder',companySlug:'warteschleifenwunder',type:'LinkedIn / B2B',kind:'Klare These',heading:'Guter Service beginnt vor der ersten Antwort.',image:'service-beginnt-vor-antwort.jpg',
  summary:'Bevor ein Ticket beantwortet wird, müssen Zuständigkeiten und Eskalation geklärt sein.',
  text:'Guter Service beginnt vor der ersten Antwort.\n\nWer darf entscheiden? Wer übernimmt, wenn ein Fall liegen bleibt? Und wann bekommt die Kundschaft ein belastbares Update?\n\nDiese Fragen löst kein freundlicher Textbaustein. Aber eine gute Serviceorganisation.\n\nWie regelt ihr die letzte Zuständigkeit?\n\nFiktives Beispiel aus dem Romanexperiment f0lg3nr31ch.',
  hook:'Eine Behauptung, die überraschen darf, aber fachlich begründbar bleibt.',proof:'Die anschließenden drei Fragen machen „guten Service“ überprüfbar – ohne ausgedachte Erfolgsquote.',cta:'Die offene Frage lädt zur eigenen Praxis statt zur Buchungsanfrage ein.',why:'B2B-Leser interessieren sich eher für ein wiedererkennbares Betriebsproblem als für allgemeine Qualitätsversprechen.'
 },
 {
  id:'vier-stunden-zwei-uhren',company:'Warteschleifenwunder',companySlug:'warteschleifenwunder',type:'Threads / Erklärstück',kind:'Konkretes Beispiel',heading:'Vier Stunden. Zwei Uhren.',image:'vier-stunden-zwei-uhren.jpg',
  summary:'Eine kleine Rechnung zeigt, weshalb SLA-Kalender und normale Uhrzeit unterschiedlich sein können.',
  text:'„Antwort in vier Stunden“ klingt eindeutig. Ist es nicht.\n\nTicket Freitag um 16 Uhr. Servicezeit: Mo–Fr 9–17 Uhr, kein Feiertag.\n\n4 Kalenderstunden: Freitag 20 Uhr.\n4 Servicestunden: Montag 12 Uhr.\n\nEine Frist ohne klar definierten Kalender ist kein gutes Versprechen.\n\nFiktives Lernbeispiel aus f0lg3nr31ch.',
  hook:'Ein kurzer Gegensatz macht eine unsichtbare Vertragsannahme sichtbar.',proof:'Die nachprüfbare Beispielrechnung steht im Post; die Zeiten gelten nur unter den ausdrücklich genannten Bedingungen.',cta:'Leser können die vereinbarte Servicezeit ihres eigenen Supports hinterfragen.',why:'Eine konkrete Mini-Rechnung ist auf Textplattformen leichter diskutierbar als ein abstrakter SLA-Fachaufsatz.'
 },
 {
  id:'schnittstelle-mit-verantwortung',company:'Palettenpalaver',companySlug:'palettenpalaver',type:'LinkedIn / B2B',kind:'Perspektivwechsel',heading:'Eine Schnittstelle braucht eine Verantwortung.',image:'schnittstelle-mit-verantwortung.jpg',
  summary:'Eine API-Anbindung ist nicht fertig, wenn nur der erste Datensatz erfolgreich übertragen wurde.',
  text:'Eine Schnittstelle ist nicht fertig, wenn der erste Datensatz ankommt.\n\nSie ist erst belastbar, wenn klar ist, wer Fehler erkennt, wer erneut überträgt und wer informiert wird, wenn der Abgleich ausbleibt.\n\nMonitoring ist kein Nachtrag zur Integration. Es gehört zum Betriebsversprechen.\n\nWas testet ihr nach dem erfolgreichen Happy Path?\n\nFiktives Beispiel aus f0lg3nr31ch.',
  hook:'Bekannte Projektabnahme neu formuliert: vom technischen Erfolg zur betrieblichen Verantwortung.',proof:'Monitoring, Wiederholung und Eskalation sind konkrete Arbeitsergebnisse.',cta:'Frage nach Tests jenseits des Happy Path, keine leere Kontaktaufforderung.',why:'Das Motiv spricht Entwickler und Verantwortliche an, ohne Technik zu einem undurchsichtigen Buzzword zu machen.'
 },
 {
  id:'versandstatus-ist-kein-haekchen',company:'Palettenpalaver',companySlug:'palettenpalaver',type:'Threads / Gespräch',kind:'Alltagskontrast',heading:'Versendet ist nicht gleich angekommen.',image:'versandstatus-ist-kein-haekchen.jpg',
  summary:'Bestellstatus, Carrier-Übergabe und Zustellnachweis sind unterschiedliche Ereignisse.',
  text:'„Versendet“ heißt nicht automatisch „zugestellt“.\n\nIm Shop kann eine Versandmeldung stehen, während der Carrier die Sendung noch nicht übernommen hat. Erst der nächste Status hilft wirklich.\n\nWelche Zustände zeigt euer Shop den Menschen, die auf ihr Paket warten?\n\nAus der fiktiven Partnerwelt von f0lg3nr31ch.',
  hook:'Ein scheinbar selbstverständliches Wort wird mit einer realistischen Ausnahme gebrochen.',proof:'Der Unterschied zwischen Versandmeldung, Übergabe und Zustellung ist fachlich nachvollziehbar.',cta:'Eine konkrete Frage eröffnet Erfahrungsberichte.',why:'Threads funktioniert als Gesprächsanstoß; die Beobachtung ist kurz genug, um ohne technische Vorbildung verstanden zu werden.'
 },
 {
  id:'umsatz-ist-nicht-auszahlung',company:'Belegballett',companySlug:'belegballett',type:'LinkedIn / B2B',kind:'Missverständnis auflösen',heading:'Umsatz ist nicht gleich Auszahlung.',image:'umsatz-ist-nicht-auszahlung.jpg',
  summary:'Zahlungsdienstleistergebühren, Rückerstattungen und zeitversetzte Auszahlungen erklären Abweichungen.',
  text:'Umsatz ist nicht gleich Auszahlung.\n\nBestellungen, Zahlungsfreigaben, Gebühren, Erstattungen und Bankeingänge folgen unterschiedlichen Ereignissen und oft unterschiedlichen Zeitpunkten.\n\nWer nur die Auszahlung mit dem Shopumsatz vergleicht, sucht schnell die falsche Differenz.\n\nWorauf baut ihr euren Zahlungsabgleich auf?\n\nFiktives Beispiel aus dem Romanexperiment f0lg3nr31ch.',
  hook:'Ein prägnanter Widerspruch zu einer verbreiteten Vereinfachung.',proof:'Der Text benennt unterschiedliche Datenereignisse; es werden keine scheinpräzisen Steuerbeträge erfunden.',cta:'Die Frage lenkt zu einem nachvollziehbaren Abgleichsprozess.',why:'Ein fachlicher Irrtum wird aufgegriffen, ohne Steuerberatung oder eine garantierte Lösung vorzutäuschen.'
 },
 {
  id:'regel-ohne-herkunft',company:'Belegballett',companySlug:'belegballett',type:'Threads / Denkanstoß',kind:'Frage statt Behauptung',heading:'Eine Zahl ohne Herkunft ist keine Antwort.',image:'regel-ohne-herkunft.jpg',
  summary:'Regelversionen und Datenherkunft gehören zu einem prüfbaren Commerce-Reporting.',
  text:'Eine Zahl im Dashboard sieht oft endgültig aus.\n\nAber nach welcher Regel wurde sie berechnet? Aus welchen Daten? Und was geschieht, wenn eine Rückerstattung später eingeht?\n\nEin guter Bericht braucht nicht nur ein Ergebnis. Er braucht auch eine Erklärung.\n\nFiktiver Denkanstoß aus f0lg3nr31ch.',
  hook:'Die erste Zeile weckt Zweifel an etwas scheinbar objektivem.',proof:'Drei überprüfbare Fragen ersetzen pauschale Kritik an Dashboards.',cta:'Der Leser soll seine eigene Datenherkunft prüfen, nicht ein Produkt kaufen.',why:'Die Formulierung erzeugt Gesprächsstoff und bietet gleichzeitig eine sofort nutzbare Checkliste.'
 }
];
export const SOCIAL_SLUGS=['partnerwelt/share/',...POSTS.map(p=>'partnerwelt/share/'+p.id+'/')];
const E=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const ROOT='https://folgenreich.benjamin-lam.de';
const SHARE=ROOT+'/partnerwelt/share/';
const imageURL=p=>SHARE+'assets/og/'+p.image;
const postURL=p=>SHARE+p.id+'/';
const imageAlt=p=>'Originale, KI-unterstützt gestaltete Social-Media-Grafik mit der Aussage „'+p.heading+'“. Bei Bildmotiven mit Personen sind diese KI-generiert und fiktiv.';
const disclosure='Fiktive Kampagnen aus dem Romanexperiment f0lg3nr31ch. Keine echten Unternehmen, Mitarbeitenden, Angebote oder Kundenergebnisse. Alle Social-Grafiken wurden KI-unterstützt gestaltet; gezeigte Personen sind KI-generiert.';
const makeHead=({title,description,url,image,alt,css})=>`<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="robots" content="index,follow"><title>${E(title)} | f0lg3nr31ch</title><meta name="description" content="${E(description)}"><link rel="canonical" href="${E(url)}"><meta property="og:type" content="article"><meta property="og:locale" content="de_DE"><meta property="og:site_name" content="f0lg3nr31ch / Partnerwelt – Social-Labor"><meta property="og:title" content="${E(title)}"><meta property="og:description" content="${E(description)}"><meta property="og:url" content="${E(url)}"><meta property="og:image" content="${E(image)}"><meta property="og:image:secure_url" content="${E(image)}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${E(alt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${E(title)}"><meta name="twitter:description" content="${E(description)}"><meta name="twitter:image" content="${E(image)}"><meta name="twitter:image:alt" content="${E(alt)}"><link rel="stylesheet" href="${css}share.css"><link rel="icon" type="image/svg+xml" href="${css==='assets/'?'../':'../../'}assets/favicon.svg"><script type="module" src="${css}share.js"></script>`;
const makeJsonLD=obj=>'<script type="application/ld+json">'+JSON.stringify(obj).replace(/</g,'\\u003c')+'</script>';
const startBody=(inner=false)=>`</head><body class="lab"><a href="#inhalt" class="lab-skip">Zum Inhalt springen</a><div class="lab-ribbon"><div class="lab-container"><strong>ROMANEXPERIMENT</strong><span>${E(disclosure)}</span></div></div><header class="lab-header lab-container"><a class="lab-brand" href="/partnerwelt/">f0lg3nr31ch <span> / Partnerwelt</span></a><nav aria-label="Hauptnavigation"><a href="/partnerwelt/">Partnerwelt</a><a href="/partnerwelt/share/" ${inner?'':'aria-current="page"'}>Social-Labor</a><a href="/experiment/">Zum Romanexperiment</a></nav></header><main class="lab-container" id="inhalt">`;
const endBody=`</main><footer class="lab-container lab-footer"><p>Ein öffentliches How-to im Rahmen des fiktiven Romans. Keine echten Angebote, Kontakte oder Erfolgszahlen.</p><nav aria-label="Rechtliches"><a href="/partnerwelt/">Partnerwelt</a><a href="/partnerwelt/impressum/">Impressum</a><a href="/partnerwelt/datenschutz/">Datenschutz</a></nav></footer></body></html>`;
function controls(p){
 const encoded=encodeURIComponent(p.text), u=encodeURIComponent(postURL(p));
 return `<div class="lab-actions" data-share-item data-share-title="${E(p.heading)}" data-share-text="${E(p.text)}" data-share-url="${E(postURL(p))}"><button type="button" data-share-action="share" class="lab-action lab-action-primary">Teilen</button><button type="button" data-share-action="copy" class="lab-action">Text kopieren</button><button type="button" data-share-action="link" class="lab-action">Link kopieren</button><a class="lab-action" href="https://www.threads.com/intent/post?text=${encoded}&amp;url=${u}" target="_blank" rel="noopener noreferrer">Threads-Entwurf <span aria-hidden="true">↗</span></a><a class="lab-action" href="https://www.linkedin.com/sharing/share-offsite/?url=${u}" target="_blank" rel="noopener noreferrer">LinkedIn-Vorschau <span aria-hidden="true">↗</span></a><span class="lab-status" role="status" aria-live="polite"></span></div>`;
}
function card(p,i){
 return `<article class="lab-card" aria-labelledby="card-${i}"><a class="lab-card-image" href="${p.id}/"><img src="assets/og/${E(p.image)}" alt="${E(imageAlt(p))}" width="1200" height="630" loading="lazy" decoding="async"></a><div class="lab-card-text"><p class="lab-kicker">${E(p.type)} · ${E(p.company)}</p><h3 id="card-${i}"><a href="${p.id}/">${E(p.heading)}</a></h3><p>${E(p.summary)}</p><p class="lab-small">${E(p.kind)} · Grafik KI-unterstützt erstellt, fiktiver Inhalt</p><a class="lab-why-link" href="${p.id}/">Beitrag und Warum-so-Anleitung lesen <span aria-hidden="true">↗</span></a>${controls(p)}</div></article>`;
}
function indexPage(){
 const url=SHARE,title='Social-Labor: Teilen und verstehen',desc='Sechs fiktive Social-Media-Beiträge, echte Kommunikationsprinzipien: Hook, Beleg, Frage und teilbare Links. Ein How-to aus dem Romanexperiment f0lg3nr31ch.';
 const schema={'@context':'https://schema.org','@type':'CollectionPage','@id':url,name:title,url,description:desc,inLanguage:'de',isPartOf:{'@type':'WebSite',name:'f0lg3nr31ch',url:ROOT},hasPart:POSTS.map(p=>({'@type':'CreativeWork',name:p.heading,url:postURL(p)}))};
 return makeHead({title,description:desc,url,image:SHARE+'assets/og/social-labor.jpg',alt:'KI-unterstützt gestaltetes Social-Labor-Motiv: Echte Beispiele, erfundene Unternehmen.',css:'assets/'})+makeJsonLD(schema)+startBody(false)+`<section class="lab-hero"><p class="lab-kicker">HOW TO / SOCIAL MEDIA · 2026</p><h1>Wie aus einem Satz<br><em>ein teilbarer Gedanke</em> wird.</h1><p>Sechs kleine Experimente aus drei Unternehmen, die es nicht gibt. Die Beispiele sind erfunden; die Prinzipien dahinter lassen sich verwenden. Wähle einen Beitrag, teile ihn und prüfe anschließend selbst, wie die Vorschau aussieht.</p><p class="lab-inline-notice">Keine echten Werbekunden. Keine erfundenen Kennzahlen. Kein automatisches Veröffentlichen.</p></section>
<section class="lab-how" aria-labelledby="how-title"><div><p class="lab-kicker">Das Handwerk dahinter</p><h2 id="how-title">Ein guter Post braucht nicht viel. Aber eine Entscheidung.</h2></div><ol class="lab-how-grid"><li><span>01 / Zielgruppe</span><strong>Für wen?</strong><p>Ein Lagerleiter erkennt ein anderes Problem als jemand im Kundenservice. Nicht alle gleichzeitig ansprechen.</p></li><li><span>02 / Einstieg</span><strong>Warum weiterlesen?</strong><p>Eine klare Beobachtung, ein überprüfbarer Gegensatz oder ein konkreter Fall statt großer Versprechen.</p></li><li><span>03 / Nutzwert</span><strong>Was bleibt?</strong><p>Ein Beispiel, eine Frage oder ein nächster Prüfschritt – keine erfundene Statistik.</p></li><li><span>04 / Einladung</span><strong>Was nun?</strong><p>Link öffnen, Erfahrung ergänzen, einen Prozess prüfen. Eine ehrliche Handlung statt Druck.</p></li></ol></section>
<section class="lab-showcase" aria-labelledby="examples-title"><div class="lab-section-title"><p class="lab-kicker">Sechs Postkarten aus der Romanwelt</p><h2 id="examples-title">Ausprobieren statt behaupten.</h2><p>Jede Karte besitzt eine eigene URL und Social-Vorschau. „Teilen“ nutzt nach Möglichkeit den Dialog deines Geräts; sonst wird der Text mit Link kopiert. Threads und LinkedIn öffnen nur Entwürfe beziehungsweise Vorschauen – veröffentlicht wird nichts automatisch.</p></div><div class="lab-post-grid">${POSTS.map(card).join('')}</div></section>
<section class="lab-learn" aria-labelledby="lab-learn-title"><div><p class="lab-kicker">Warum diese Technik?</p><h2 id="lab-learn-title">Drei Handgriffe, die man selbst prüfen kann.</h2></div><dl><div><dt>Eigene URL pro Idee</dt><dd>Der Link führt zu genau einem Beitrag. Das erleichtert Teilen, Zitieren und eine aussagekräftige Vorschau.</dd></div><div><dt>Open Graph im HTML</dt><dd>Titel, Beschreibung, Bild und URL stehen serverseitig bereit. Das Teilen hängt nicht von JavaScript oder einem Tracking-Widget ab.</dd></div><div><dt>Teilen nur auf Wunsch</dt><dd>Die native Teilen-Funktion benötigt eine Nutzergeste. Ohne Unterstützung kann man Text oder Link kopieren. Externe Plattformen werden erst auf Klick geöffnet.</dd></div></dl><p class="lab-small">Redaktioneller Stand: November 2026. Grundlagen: Open Graph Protocol, LinkedIn „Make your website shareable“, MDN Web Share API und W3C WCAG 2.2. Die technischen Regeln sind nachprüfbar; Reichweite, Anzeigenleistung und Klickzahlen werden nicht behauptet.</p></section>`+endBody;
}
function detailPage(p){
 const url=postURL(p);const title=p.heading;const desc=p.summary+' Fiktiver Social-Media-Beitrag mit einer kurzen Erklärung zur Marketingidee und eigener Share-Vorschau.';
 const schema={'@context':'https://schema.org','@type':'CreativeWork','@id':url,name:title,url,inLanguage:'de',description:desc,genre:'Fiktive Social-Media-Kampagne / erklärendes How-to',isPartOf:{'@type':'CollectionPage',name:'Social-Labor',url:SHARE},image:imageURL(p),isAccessibleForFree:true};
 return makeHead({title,description:desc,url,image:imageURL(p),alt:imageAlt(p),css:'../assets/'})+makeJsonLD(schema)+startBody(true)+`<nav class="lab-crumbs" aria-label="Brotkrumen"><a href="/partnerwelt/">Partnerwelt</a><span aria-hidden="true">/</span><a href="/partnerwelt/share/">Social-Labor</a><span aria-hidden="true">/</span><span>${E(p.company)}</span></nav><article class="lab-detail"><header><p class="lab-kicker">${E(p.type)} · ${E(p.kind)} · fiktive Kampagne</p><h1>${E(p.heading)}</h1><p class="lab-deck">${E(p.summary)}</p></header><figure class="lab-detail-image"><img src="../assets/og/${E(p.image)}" width="1200" height="630" alt="${E(imageAlt(p))}" fetchpriority="high"><figcaption>KI-unterstützt gestaltete Grafik. Etwaige abgebildete Teams sind KI-generiert; alle Firmen, Personen und Beispiele fiktiv.</figcaption></figure><div class="lab-reading"><section aria-labelledby="post-text"><p class="lab-kicker">Der Beitrag · kopierfertig</p><h2 id="post-text">So könnte er veröffentlicht werden.</h2><blockquote class="lab-post-copy">${E(p.text)}</blockquote>${controls(p)}<p class="lab-small">Auf LinkedIn muss der Text gegebenenfalls selbst eingesetzt werden; der Share-Link übergibt dort vor allem die URL. Threads öffnet einen editierbaren Entwurf. Kein automatischer Post, keine garantierte Darstellung.</p></section><aside class="lab-reason" aria-labelledby="reason-heading"><p class="lab-kicker">HOW TO / WARUM SO?</p><h2 id="reason-heading">Die Mechanik hinter dem Post.</h2><p>${E(p.why)}</p><dl><div><dt>Hook</dt><dd>${E(p.hook)}</dd></div><div><dt>Beleg</dt><dd>${E(p.proof)}</dd></div><div><dt>Einladung</dt><dd>${E(p.cta)}</dd></div></dl><p class="lab-small">Keine allgemeingültige Viralitätsformel: Ob der Post funktioniert, hängt von Publikum, Kontext, Zeitpunkt und tatsächlicher Reaktion ab.</p></aside></div><div class="lab-bottom-nav"><a href="/partnerwelt/${E(p.companySlug)}/">Fachliche Grundlage bei ${E(p.company)} lesen</a><a href="/partnerwelt/share/">Alle sechs Ideen ansehen</a></div></article>`+endBody;
}
function write(dest,filename,value){const p=path.join(dest,filename);mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,value)}
export function installPartnerweltSocial(dist){
 const companyPages=['index.html','palettenpalaver/index.html','belegballett/index.html','warteschleifenwunder/index.html'];
 const partner=path.join(dist,'partnerwelt'),cssFile=path.join(partner,'assets','site.css');
 let css=readFileSync(cssFile,'utf8');
 if(css.includes('social-lab-contrast-2026-11-05'))throw new Error('Social Lab already applied');
 // The large 01/02/03 labels were at opacity .28 (~1.7:1), despite 3:1 being required for large text.
 css+='\n/* social-lab-contrast-2026-11-05: AA contrast fix for visible large offer labels */\n@layer components {.care #angebote .number {opacity:1;color:#862d31;} .care #angebote .card:nth-child(2){border-color:#8e4630;}}\n';
 writeFileSync(cssFile,css,'utf8');
 for(const page of companyPages){
  const htmlPath=path.join(partner,page);let html=readFileSync(htmlPath,'utf8');
  const old='</nav></header>';
  if(!html.includes(old))throw new Error('Missing company navigation marker '+page);
  const url=page==='index.html'?'./share/':'../share/';
  html=html.replace(old,`<a href="${url}">Social-Labor</a>${old}`);
  writeFileSync(htmlPath,html,'utf8');
 }
 const share=path.join(partner,'share');
 write(share,'index.html',indexPage());
 for(const p of POSTS)write(share,p.id+'/index.html',detailPage(p));
 write(share,'assets/share.css',readFileSync(new URL('./partnerwelt-share.css',import.meta.url),'utf8'));
 write(share,'assets/share.js',readFileSync(new URL('./partnerwelt-share.js',import.meta.url),'utf8'));
 // A deterministic, independently generated collection of original JPEG social cards.
 const encoded=readFileSync(new URL('../bundles/partnerwelt-social-2026-11-05.tar.gz.base64',import.meta.url),'utf8').replace(/\s/g,'');
 const compressed=Buffer.from(encoded,'base64');
 const sha='5a62cdc3a836e5270354ddc31b0a6c9d95e5b7921069e2562bfd00d6f6aad199';
 if(createHash('sha256').update(compressed).digest('hex')!==sha)throw new Error('Social preview bundle SHA-256 mismatch');
 const tar=gunzipSync(compressed);let i=0,found=0;
 while(i+512<=tar.length){
  const h=tar.subarray(i,i+512),name=h.toString('utf8',0,100).split('\0')[0];if(!name)break;
  const size=parseInt(h.toString('ascii',124,136).replace(/\0/g,'').trim(),8);
  if(!/^partnerwelt\/share\/assets\/og\/[a-z0-9-]+\.jpg$/.test(name)||h[156]!==48||!Number.isSafeInteger(size)||size<=0||i+512+size>tar.length)throw Error('Invalid social asset: '+name);
  write(dist,name,tar.subarray(i+512,i+512+size));found++;i+=512+Math.ceil(size/512)*512;
 }
 if(found!==POSTS.length+1)throw new Error('Incomplete social asset bundle: '+found);
 // Separate Partnerwelt sitemap is updated alongside the Reader root sitemap.
 const sitemapFile=path.join(partner,'sitemap.xml');let sitemap=readFileSync(sitemapFile,'utf8');
 const urls=SOCIAL_SLUGS.map(slug=>`<url><loc>${ROOT}/${slug}</loc></url>`).join('');
 if(!sitemap.includes('</urlset>'))throw Error('Invalid Partnerwelt sitemap');
 sitemap=sitemap.replace('</urlset>',urls+'</urlset>');writeFileSync(sitemapFile,sitemap,'utf8');
 console.log('Partnerwelt Social-Labor: '+POSTS.length+' share pages, '+found+' previews, WCAG contrast patch');
}