/** Warteschleifenwunder: editorial visual layer for the versioned Partnerwelt bundle.
 * Deliberately no frameworks, remote assets or JavaScript in delivered HTML.
 * Fails rather than silently patching a future, incompatible source release.
 */
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';

function once(source, search, replacement, label) {
  const first=source.indexOf(search);
  if(first<0 || source.indexOf(search,first+search.length)!==-1) {
    throw new Error('Partnerwelt Visual: missing or ambiguous anchor: '+label);
  }
  return source.replace(search,replacement);
}

const sla=`<figure class="sla-clock" aria-labelledby="sla-clock-title" aria-describedby="sla-clock-caption">
<figcaption id="sla-clock-title"><span class="eyebrow">Servicezeit zählt anders</span><strong>Vier Stunden. Zwei mögliche Ziele.</strong></figcaption>
<div class="sla-lane"><div class="sla-lane-head"><span>Kalenderstunden</span><strong>Freitag 20:00</strong></div><div class="sla-bar sla-bar--calendar" aria-hidden="true"><span>Fr 16:00</span><b>+ 4 Stunden durchgehend</b><span>Fr 20:00</span></div></div>
<div class="sla-lane"><div class="sla-lane-head"><span>Servicestunden</span><strong>Montag 12:00</strong></div><div class="sla-bar sla-bar--service" aria-hidden="true"><span class="sla-work">Fr 16–17 <b>1 h</b></span><span class="sla-pause">Pause: Freitag 17 Uhr bis Montag 9 Uhr<br/><small>Außerhalb der Servicezeit</small></span><span class="sla-work">Mo 9–12 <b>3 h</b></span></div></div>
<p class="sla-clock-note" id="sla-clock-caption">Schematische Darstellung, nicht maßstabsgetreu. Annahme: Servicezeit Mo–Fr 9–17 Uhr (Europe/Berlin), kein Feiertag; Eingang Freitag 16 Uhr. Eine automatische Bestätigung ist nicht die erste inhaltliche Antwort.</p>
</figure>`;

const cockpit=`<aside class="signal-board" aria-labelledby="signal-title">
<div class="signal-heading"><p class="eyebrow">Service-Cockpit / fiktive Beispielgrößen</p><h3 id="signal-title">Was schnell aussieht, ist nicht immer gelöst.</h3><p>Keine echten Leistungsdaten. So könnten drei getrennte Steuerungsfragen aussehen:</p></div>
<div class="signal-grid"><div class="signal"><span>01 / Reaktion</span><strong>4 h</strong><small>Antwortziel im Beispiel – nur während der Servicezeit</small></div><div class="signal"><span>02 / Updates</span><strong>Wann?</strong><small>Nächste Rückmeldung ausdrücklich vereinbart</small></div><div class="signal"><span>03 / Lösung</span><strong>Offen.</strong><small>Nicht mit Eingang oder Erstreaktion verwechselt</small></div></div>
<p class="signal-foot">Zusätzlich im Blick: Wiedereröffnungen und das Alter noch offener Fälle. Keine erfundenen Erfolgsquoten.</p>
</aside>`;

const flow=`<figure class="return-flow" aria-labelledby="return-flow-title">
<figcaption id="return-flow-title"><span class="eyebrow">Vorgangsakte / fiktiver Statusfluss</span><strong>Wo bleibt die Erstattung?</strong></figcaption>
<ol class="return-stages"><li><span class="stage-index">01</span><strong>Retoure eingetroffen</strong><small>Im Lager erfasst</small></li><li class="stage--gap"><span class="stage-index">02</span><strong>Zustand geprüft?</strong><small>Hier fehlt dem Service zunächst die Information</small></li><li><span class="stage-index">03</span><strong>Erstattung freigegeben</strong><small>Fachliche Entscheidung dokumentiert</small></li><li><span class="stage-index">04</span><strong>Erstattung ausgelöst</strong><small>An Zahlungsweg übergeben</small></li><li><span class="stage-index">05</span><strong>Gutschrift sichtbar</strong><small>Beim Kunden angekommen – eigener Status</small></li></ol>
<p class="return-flow-note">Die Zustände sind beispielhaft, nicht automatisch gleichbedeutend. Zwischen Auslösung und Kontogutschrift kann Zeit liegen.</p>
</figure>
<div class="case-contrast" aria-label="Beispiel für verständliche Statuskommunikation"><div><p class="eyebrow">Vorher / dreimal dieselbe Antwort</p><blockquote>„Ihre Anfrage ist in Bearbeitung.“</blockquote><small>Freundlich, aber ohne neuen Informationswert.</small></div><div><p class="eyebrow">Nachher / nachvollziehbare Antwort</p><blockquote>„Die Retoure ist eingetroffen. Die Prüfung steht noch aus. Wir nennen Ihnen den nächsten Schritt und melden uns zum vereinbarten Termin.“</blockquote><small>Beispieltext, keine echte Kundenkommunikation.</small></div></div>`;

const roles={
 'Jona Dranbleib':[['Entscheidet','Serviceprioritäten und Eskalationsweg'],['Übergibt an','benannte Fachverantwortliche'],['Misst','Rückmeldungen und offene Eskalationen']],
 'Lene Nachgehakt':[['Entscheidet','welche Wissensartikel überarbeitet werden'],['Stimmt ab mit','zuständiger Fachabteilung'],['Prüft','Gültigkeit und Wiederverwendung']],
 'Sam Rückmeldung':[['Prüft','Stichproben und Fallverläufe'],['Eskalation an','Serviceleitung bei systematischen Lücken'],['Misst','Wiedereröffnungen und Lösungsqualität']]
};

export function installPartnerweltRedesign(dist) {
 const htmlPath=path.join(dist,'partnerwelt','warteschleifenwunder','index.html');
 const cssPath=path.join(dist,'partnerwelt','assets','site.css');
 let html=readFileSync(htmlPath,'utf8');
 if(html.includes('data-editorial="care-redesign-2026-11-05"')) throw new Error('Partnerwelt Visual already applied');
 html=once(html,'<section class="hero">','<section class="hero" data-editorial="care-redesign-2026-11-05">','hero');
 html=once(html,'<p class="hero-foot">Fiktive Firma. Konkretes Handwerk.</p>',
 `<p class="hero-foot">Fiktive Firma. Konkretes Handwerk.</p><div class="queue-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><span>Eine Anfrage bleibt nicht liegen.</span></div>`, 'hero motif');
 // Place the concrete SLA visualization beside the text, before process instructions.
 const oldExample='<div class="example"><strong>Beispiel: vier Servicestunden</strong>\n<p>Servicezeit: Mo–Fr, 9–17 Uhr, Europe/Berlin. Eingang: Freitag 16 Uhr. Ziel: Montag 12 Uhr, sofern kein Feiertag dazwischenliegt. In Kalenderstunden wären vier Stunden bereits Freitag 20 Uhr erreicht.</p>\n</div>';
 html=once(html,oldExample,`<div class="example"><strong>Beispiel: vier Servicestunden</strong><p>Freitag 16–17 Uhr zählt eine Stunde. Montag 9–12 Uhr zählt drei weitere. Vier Kalenderstunden wären dagegen bereits Freitag um 20 Uhr vergangen.</p></div>`,'SLA example');
 html=once(html,'</div>\n<ol class="steps">',`</div>\n${sla}\n<ol class="steps">`,'SLA figure placement');
 // Introduce an informative miniature dashboard instead of invented real-world KPIs.
 html=once(html,'</div>\n</section>\n<section aria-labelledby="praxis" class="workbench"',`</div>\n${cockpit}\n</section>\n<section aria-labelledby="praxis" class="workbench"`,'offers and dashboard');
 // Give each fictional team member a useful role file, not placeholder avatars.
 html=html.replace(/<article class="person">[\s\S]*?<\/article>/g,match=>{
   const name=Object.keys(roles).find(n=>match.includes(n));
   if(!name) throw new Error('Unknown team role in care redesign');
   const details=roles[name].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
   return match.replace(/<span aria-hidden="true" class="initial">[JLS]<\/span>/,'<span class="role-file-number" aria-hidden="true">AKTE / '+(['Jona Dranbleib','Lene Nachgehakt','Sam Rückmeldung'].indexOf(name)+1).toString().padStart(2,'0')+'</span>')
     .replace('</article>',`<dl class="role-matrix">${details}</dl></article>`);
 });
 // Follow the actual fictional returns workflow visually, including the information gap.
 html=once(html,'<div class="case-grid">',flow+'\n<div class="case-grid">','case process');
 let css=readFileSync(cssPath,'utf8');
 if(css.includes('/* care-redesign-2026-11-05 */')) throw new Error('Partnerwelt Visual CSS already applied');
 css+='\n'+style+'\n';
 writeFileSync(htmlPath,html,'utf8');
 writeFileSync(cssPath,css,'utf8');
}

const style=String.raw`/* care-redesign-2026-11-05 */
@layer components {
/* One unmistakable editorial hero, without extra network assets. */
.care .hero{position:relative;isolation:isolate;background:#163d39;box-shadow:0 0 0 100vmax #163d39;clip-path:inset(0 -100vmax);color:#fff9f1;gap:clamp(2rem,5vw,5rem);padding-block:6.5rem 5.5rem}
.care .hero h1{font-size:clamp(3rem,6.7vw,6.7rem);line-height:.98;letter-spacing:-.068em;max-width:12ch}
.care .hero .eyebrow,.care .hero-foot,.care .hero-art figcaption{color:#d7e5d8}
.care .hero .lead{font-size:clamp(1.15rem,1.7vw,1.38rem);max-width:36rem}
.care .hero .button{color:#163d39;background:#fff2ce;border-color:#fff2ce}
.care .hero .button:hover{color:#fff2ce;background:transparent}
.care .hero .ai-hero{position:relative;overflow:hidden;border-radius:.65rem 5.5rem .65rem .65rem;border:1px solid #638279}
.care .hero .ai-hero::after{content:"";position:absolute;inset:0 0 2.6rem;background:linear-gradient(135deg,rgba(17,72,61,.55),rgba(20,58,66,.07));pointer-events:none;mix-blend-mode:multiply}
.care .hero .ai-hero img{height:360px;min-height:0;aspect-ratio:4/3;object-fit:cover;filter:saturate(.65) contrast(1.08);border:0;border-radius:0}
.care .hero .ai-hero figcaption{padding:.7rem .9rem;margin:0;font-size:.7rem;position:relative;z-index:1}
.queue-mark{display:flex;align-items:center;gap:.43rem;margin-top:2rem;color:#d7e5d8}
.queue-mark i{width:.55rem;height:.55rem;display:inline-block;border:1px solid currentColor;border-radius:50%}
.queue-mark i:nth-child(4){background:#e4bc72;border-color:#e4bc72;box-shadow:0 0 0 .3rem rgba(228,188,114,.16)}
.queue-mark span{font:.7rem "JetBrains Mono",ui-monospace,monospace;letter-spacing:0;margin-left:.6rem}
/* Visual hierarchy through space, lines and numbers, not shadowed generic cards. */
.care #angebote .cards{gap:1.5rem}
.care #angebote .card{border-top:4px solid #9e3b39;padding:2rem 1rem 1.5rem 0}
.care #angebote .card:nth-child(2){border-color:#bb8061}
.care #angebote .card:nth-child(3){border-color:#163d39}
.care #angebote .number{font-size:clamp(2.5rem,5vw,4rem);line-height:1;letter-spacing:-.1em;opacity:.28}
.care #angebote .card h3{font-size:clamp(1.25rem,2vw,1.65rem)}
.care #team{background:#f0e7dc;box-shadow:0 0 0 100vmax #f0e7dc;clip-path:inset(0 -100vmax)}
/* SLA clock: schematic, with honest distinction between elapsed and service time. */
.sla-clock{margin-top:1.5rem;padding:1.4rem;background:#fffaf3;color:#173a35;border:1px solid #c7bbb0;border-radius:1.1rem}
.sla-clock figcaption{display:flex;flex-direction:column;gap:.25rem;margin-bottom:1.4rem}
.sla-clock figcaption strong{font-size:clamp(1.1rem,1.6vw,1.4rem);line-height:1.25}
.sla-clock figcaption .eyebrow{color:#577168}
.sla-lane+.sla-lane{margin-top:1.35rem}
.sla-lane-head{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;font-size:.82rem;margin-bottom:.45rem}
.sla-lane-head strong{font-family:"JetBrains Mono",ui-monospace,monospace;color:#163d39;font-size:.8rem}
.sla-bar{display:grid;min-height:3.4rem;overflow:hidden;border-radius:.35rem;font-size:.75rem;line-height:1.25}
.sla-bar--calendar{grid-template-columns:auto 1fr auto;align-items:center;gap:.4rem;background:#a94e3b;color:#fff9f1;padding:.6rem .7rem}
.sla-bar--calendar b{text-align:center;font-size:.78rem}
.sla-bar--service{grid-template-columns:1fr minmax(6rem,1.8fr) 1.25fr;text-align:center}
.sla-bar--service>span{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:.3rem;padding:.45rem .35rem}
.sla-work{background:#163d39;color:#fff9f1}
.sla-pause{background:repeating-linear-gradient(135deg,#f0e7dc 0,#f0e7dc 7px,#ded0c2 7px,#ded0c2 9px);color:#553f37;font-size:.68rem}
.sla-pause small{display:block;width:100%;font-size:.64rem}
.sla-clock-note{color:#516059;font-size:.78rem;line-height:1.5;margin-top:1rem}
.care .workbench{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,5vw,5rem);align-items:start}.care .workbench>div:first-child{grid-column:1;grid-row:1}.care .workbench>.steps{grid-column:2;grid-row:1}.care .workbench>.sla-clock{grid-column:1/-1;grid-row:2;margin-top:0}
/* KPI vocabulary and data provenance shown in a lightweight editorial strip. */
.signal-board{border-top:1px solid #9e3b39;margin-top:3rem;padding-top:2rem}
.signal-heading{display:grid;grid-template-columns:1.2fr 1fr;column-gap:2rem;align-items:end;margin-bottom:1.5rem}
.signal-heading .eyebrow{grid-column:1/-1;margin-bottom:.6rem}
.signal-heading h3{font-size:clamp(1.6rem,3vw,2.4rem);max-width:20ch}
.signal-heading p{font-size:.88rem;color:var(--muted)}
.signal-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#c6a6a1;border:1px solid #c6a6a1}
.signal{display:flex;flex-direction:column;min-width:0;gap:.65rem;background:#fff8f1;padding:1.2rem}
.signal>span{font:.68rem "JetBrains Mono",ui-monospace,monospace;text-transform:uppercase;color:#775155}
.signal strong{font-family:"Source Serif 4",Georgia,serif;font-size:clamp(2rem,4vw,3.8rem);line-height:1.05;letter-spacing:-.06em}
.signal small{font-size:.78rem;line-height:1.4;color:#775155}
.signal-foot{margin-top:.75rem;font-size:.76rem;color:var(--muted)}
/* Internal roles presented as useful case files, without invented portraits. */
.care #team .person{display:flex;flex-direction:column;gap:0;padding:1.3rem;border:1px solid #d4c5b8;border-top:3px solid #163d39;background:#fff8f1}
.care #team .role-file-number{font:.7rem "JetBrains Mono",ui-monospace,monospace;letter-spacing:.1em;color:#785654;margin-bottom:1.2rem}
.care #team .person h3{font-family:"Source Serif 4",Georgia,serif;font-size:1.65rem;line-height:1.1;margin-block:.35rem .8rem}
.role-matrix{margin:auto 0 0;padding-top:1rem}
.role-matrix div{border-top:1px solid #d4c5b8;padding:.5rem 0;display:grid;grid-template-columns:6.4rem 1fr;gap:.6rem}
.role-matrix dt{font:.69rem "JetBrains Mono",ui-monospace,monospace;color:#745554}
.role-matrix dd{margin:0;font-size:.78rem;line-height:1.4;color:#57393b}
/* A customer status flow, showing which information was missing. */
.return-flow{margin-top:2.5rem;background:#fff8f1;padding:1.5rem;border-radius:1rem;border:1px solid #d4b9af}
.return-flow figcaption{display:flex;flex-direction:column;gap:.3rem}
.return-flow figcaption strong{font-family:"Source Serif 4",Georgia,serif;font-size:clamp(1.5rem,2.5vw,2.2rem)}
.return-stages{list-style:none;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.75rem;padding:0;margin:1.5rem 0 0}
.return-stages li{min-width:0;position:relative;border-top:4px solid #163d39;padding-top:.6rem}
.return-stages li:not(:last-child)::after{content:"→";position:absolute;right:-.7rem;top:-.4rem;color:#745554;font-weight:700}
.return-stages .stage--gap{border-color:#b65c3c;background:#ffeddc;padding-inline:.45rem}
.stage-index{display:block;font:.69rem "JetBrains Mono",ui-monospace,monospace;color:#775155;margin-bottom:.5rem}
.return-stages strong{display:block;font-size:.88rem;line-height:1.25}
.return-stages small{display:block;margin-top:.4rem;font-size:.72rem;line-height:1.35;color:#775155}
.return-flow-note{font-size:.78rem;color:#775155;margin-top:1.3rem}
.case-contrast{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1.25rem}
.case-contrast>div{background:#fff8f1;padding:1.4rem;border:1px solid #d4b9af;border-radius:.75rem}
.case-contrast>div:last-child{border-left:4px solid #163d39}
.case-contrast blockquote{margin:1rem 0;font-family:"Source Serif 4",Georgia,serif;font-size:1.2rem;line-height:1.35}
.case-contrast small{font-size:.75rem;color:#775155}
}
@layer responsive {
@media(max-width:1050px){.care .hero{gap:2rem}.care .workbench{grid-template-columns:1fr}.care .workbench>div:first-child,.care .workbench>.steps,.care .workbench>.sla-clock{grid-column:1;grid-row:auto}.return-stages{grid-template-columns:repeat(3,minmax(0,1fr))}.return-stages li:nth-child(3)::after{display:none}}
@media(max-width:720px){.care .hero{padding-block:3.5rem 3rem}.care .hero h1{font-size:clamp(2.65rem,9.5vw,4.6rem)}.care .hero .ai-hero img{height:auto;aspect-ratio:2.48/1}.care .hero .ai-hero::after{inset:0 0 2.5rem}.queue-mark span{font-size:.62rem}.care #team .person{display:flex}.signal-heading{grid-template-columns:1fr;gap:.75rem}.signal-grid{grid-template-columns:1fr}.signal{padding:1rem}.signal strong{font-size:2.7rem}.role-matrix div{grid-template-columns:7.5rem 1fr}.return-stages{grid-template-columns:1fr;gap:0}.return-stages li{padding:.75rem .6rem;border-left:3px solid #163d39;border-top:1px solid #d4b9af}.return-stages li:not(:last-child)::after{right:.1rem;top:auto;bottom:-.5rem;transform:rotate(90deg)}.return-stages .stage--gap{border-left-color:#b65c3c}.case-contrast{grid-template-columns:1fr}.sla-bar--service{grid-template-columns:1fr 1.25fr 1fr}.sla-pause{font-size:.6rem}.sla-pause small{font-size:.58rem}.sla-bar--calendar{font-size:.67rem}.sla-bar--calendar b{font-size:.68rem}}
@media(max-width:420px){.sla-clock{padding:1rem}.sla-bar--service{grid-template-columns:1fr 1.1fr 1fr}.sla-work{font-size:.66rem}.sla-lane-head{font-size:.73rem}.sla-lane-head strong{font-size:.69rem}.signal-heading h3{font-size:1.7rem}}
@media(prefers-reduced-motion:reduce){.care .hero *, .care .return-flow *{animation:none!important;transition:none!important}}
@media print{.care .hero{box-shadow:none;background:white;color:#111}.care .hero .eyebrow,.care .hero .hero-foot,.care .hero-art figcaption{color:#111}.care #team{box-shadow:none}.signal-grid{display:block}.signal{break-inside:avoid}.return-stages{display:block}.return-stages li{break-inside:avoid;margin-bottom:.6rem}.return-stages li::after{display:none}}
}
`;