import {escapeHtml as e,escapeMeta as em} from './lib.mjs';
export const articleSlug='magazin/white-trash-whitepapers/2026-12/ki-lesbar/';
const safeId=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const inline=s=>e(s).replace(/\[([^\]]+)\]\((https:\/\/[^\s<>"']+|\/[a-z0-9/-]+)\)/g,'<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/\[(\d+)\]/g,'<a class="ref" href="#q$1" aria-label="Quelle $1">[$1]</a>');
function renderBlocks(md){
 const lines=md.trim().split(/\r?\n/);let i=0,out='',sourceMode=false;
 const cells=l=>l.trim().slice(1,-1).split('|').map(s=>s.trim());
 while(i<lines.length){
  const s=lines[i].trim();
  if(!s){i++;continue;}
  if(s.startsWith('### ')){out+='<h3 class="subhed">'+inline(s.slice(4))+'</h3>';i++;continue;}
  if(s.startsWith('|')&&/^\|\s*---/.test(lines[i+1]||'')){
   const head=cells(s);i+=2;let rows='';
   while(lines[i]?.startsWith('|')){const r=cells(lines[i++]);if(r.length!==head.length)throw Error('Article table width mismatch');rows+='<tr><th scope="row">'+inline(r[0])+'</th>'+r.slice(1).map(v=>'<td>'+inline(v)+'</td>').join('')+'</tr>';}
   out+='<div class="tablewrap" tabindex="0" role="region" aria-label="Tabelle: '+e(head[0])+'"><table class="model cv-table"><thead><tr>'+head.map(v=>'<th scope="col">'+inline(v)+'</th>').join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div>';continue;
  }
  if(s.startsWith('>')){let paras=[],p=[];while(lines[i]?.startsWith('>')){const v=lines[i++].slice(1).trim();if(!v){if(p.length)paras.push(p.join(' '));p=[];}else p.push(v);}if(p.length)paras.push(p.join(' '));out+='<blockquote class="data prompt">'+paras.map(v=>'<p>'+inline(v)+'</p>').join('')+'</blockquote>';continue;}
  if(s.startsWith('- ')){out+='<ul>';while(lines[i]?.startsWith('- '))out+='<li>'+inline(lines[i++].slice(2))+'</li>';out+='</ul>';continue;}
  const source=s.match(/^\[(\d+)\]\s+(.+)$/);
  if(source){out+='<p id="q'+source[1]+'"><strong>['+source[1]+']</strong> '+inline(source[2])+'</p>';i++;continue;}
  let p=[s];i++;while(lines[i]?.trim()&&!/^(?:### |\||>|- |\[\d+\]\s)/.test(lines[i]))p.push(lines[i++].trim());
  out+='<p>'+inline(p.join(' '))+'</p>';
 }
 return out;
}
export function renderContextArticle({markdown,stylesheet,site}){
 const [top,...parts]=markdown.trim().split(/(?=^## )/m);
 const [heading,deck,...intro]=top.trim().split(/\n\s*\n/);
 const title=heading.replace(/^# /,'');
 const sections=parts.map(p=>{const nl=p.indexOf('\n'); const h=p.slice(3,nl).trim();return {h,id:safeId(h),body:p.slice(nl+1),sources:h.startsWith('Quellen')};});
 if(sections.length!==12||sections.some(s=>s.h.startsWith('CASE STUDY')))throw Error('Incomplete context article');
 const main=sections.map(s=>'<section id="'+s.id+'" class="'+(s.sources?'sources':'sec')+'" aria-labelledby="'+s.id+'-title"><h2 id="'+s.id+'-title">'+e(s.h)+'</h2>'+renderBlocks(s.body)+'</section>').join('');
 const toc='<ol>'+sections.map(s=>'<li><a href="#'+s.id+'">'+e(s.h)+'</a></li>').join('')+'</ol>';
 const url=site.replace(/\/$/,'')+'/'+articleSlug, image=url+'share-preview.png';
 const description='Eigenständiger Fachartikel über SEO, GEO und maschinelle Kontextverifizierung mit einem reproduzierbaren Prüfverfahren.';
 const extra='.cv-table th,.cv-table td{text-align:left;overflow-wrap:normal;min-width:100px}.cv-table th:first-child{min-width:130px}.cv-table tbody tr:last-child{font-weight:normal}.prompt{margin-inline:0}.tablewrap:focus-visible{outline:3px solid #786400;outline-offset:3px}.bodycopy li{margin:.4em 0}.cv-toc{overflow-wrap:anywhere}.hero h1{font-size:clamp(40px,8vw,96px)}@media print{.tablewrap{overflow:visible}.cv-table th,.cv-table td{min-width:0}}';
 return '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>'+em(title)+' | WHITE TRASH &amp; WHITEPAPERS</title><meta name="description" content="'+em(description)+'"><link rel="canonical" href="'+em(url)+'"><meta property="og:type" content="article"><meta property="og:title" content="'+em(title)+'"><meta property="og:description" content="'+em(description)+'"><meta property="og:url" content="'+em(url)+'"><meta property="og:image" content="'+em(image)+'"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Typografische Magazingrafik: KI-lesbar. Aber liest die KI auch? Fiktives Magazin, reale Fachrecherche."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+em(title)+'"><meta name="twitter:description" content="'+em(description)+'"><meta name="twitter:image" content="'+em(image)+'"><style>'+stylesheet+extra+'</style></head><body><a class="skip" href="#artikel">Zum Artikel</a><header><div class="top"><div class="shell"><span>Ein fiktives Branchenmagazin aus Folgenreich</span><span class="draft">Dezember 2026 · Fachartikel</span></div></div><div class="shell"><div class="masthead"><div class="mastline"><div class="mast">WHITE TRASH <span>&amp;</span><br>WHITEPAPERS</div><div class="issue">12 / 2026<br>THE 2027 ISSUE</div></div><div class="strap">Business. Technology. People. Consequences.</div></div><nav class="nav" aria-label="Ausgabe"><a href="../">Titelgeschichte</a><a href="../interview/">Gründerinterview</a><a href="./" aria-current="page">KI-lesbar</a><a href="/magazin/">Magazinübersicht</a></nav></div></header><main class="shell" id="artikel"><article><header class="hero"><span class="kicker">Fachartikel / Context Verification</span><h1>KI-lesbar. <span>Aber liest die KI auch?</span></h1><p class="deck">'+inline(deck)+'</p><div class="meta"><span>Redaktion WHITE TRASH &amp; WHITEPAPERS · Analyse</span><span>Recherche: 19. November 2026 · Ausgabe Dezember 2026</span></div></header><div class="layout"><div class="bodycopy">'+renderBlocks(intro.join('\n\n'))+main+'</div><aside class="aside cv-toc" aria-label="Inhaltsverzeichnis"><details class="toc" open><summary>In diesem Artikel</summary>'+toc+'</details><div class="boxnote"><h2>Redaktionelle Einordnung</h2><p>Eigenständiger Fachartikel auf Grundlage realer externer Quellen. Das Prüfverfahren ist ein methodischer Vorschlag, keine abgeschlossene empirische Untersuchung.</p><p><a href="#quellen-und-weiterfuhrende-informationen">Quellen und weiterführende Informationen</a></p></div></aside></div></article></main><footer class="shell foot"><strong>WHITE TRASH &amp; WHITEPAPERS</strong> · Ein fiktives Magazin aus Folgenreich · Dezember 2026 · <a href="../">Titelgeschichte</a> · <a href="../interview/">Gründerinterview</a> · <a href="/experiment/">Über das Experiment</a> · <a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a></footer></body></html>';
}
