import {escapeHtml, markdownToHtml} from './lib.mjs';

const e = escapeHtml;
const safeUrl = value => typeof value==='string' && /^https:\/\/[^\s<>"']+$/.test(value);
const key = id => 'hintergrund-'+id;

export function validateResearchSources(chapterText, catalog) {
  const errors=[];
  if(catalog?.schema_version!==1 || catalog?.chapter_id!=='how-to-service' || !Array.isArray(catalog?.sources)) return ['Ungültiger Quellenkatalog'];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(catalog.reviewed_on||'')) errors.push('Fehlendes Quellen-Prüfdatum');
  if(!catalog.editorial_note || catalog.editorial_note.length<30) errors.push('Fehlende redaktionelle Einordnung');
  const ids=new Set(), html=markdownToHtml(chapterText);
  for(const source of catalog.sources) {
    if(!source || typeof source!=='object') {errors.push('Ungültiger Quelleneintrag');continue;}
    if(!/^[a-z0-9-]+$/.test(source.id||'') || ids.has(source.id)) errors.push('Doppelte oder ungültige Quellen-ID: '+source.id);
    ids.add(source.id);
    if(!['inline','further'].includes(source.placement)) errors.push('Ungültige Platzierung: '+source.id);
    if(!safeUrl(source.url)) errors.push('Ungültige https-URL: '+source.id);
    for(const field of ['title','description','publisher','source_title']) if(typeof source[field]!=='string' || source[field].trim().length<8) errors.push('Fehlendes Quellenfeld '+field+': '+source.id);
    if(source.placement==='inline') {
      if(typeof source.anchor!=='string'||source.anchor.length<18 || chapterText.split(source.anchor).length!==2 || html.split(e(source.anchor)).length!==2) errors.push('Textanker fehlt oder ist nicht eindeutig: '+source.id);
    } else if(source.anchor) errors.push('Vertiefungsquelle darf keinen Textanker haben: '+source.id);
  }
  if(catalog.sources.filter(s=>s.placement==='inline').length!==6) errors.push('Erwartet werden sechs dezente Textverweise');
  if(catalog.sources.filter(s=>s.placement==='further').length!==2) errors.push('Erwartet werden zwei zusätzliche Vertiefungen');
  return errors;
}

export function renderResearchChapter(chapterText, catalog) {
  const errors=validateResearchSources(chapterText,catalog);
  if(errors.length) throw new Error(errors.join('\n'));
  let html=markdownToHtml(chapterText), i=0;
  for(const source of catalog.sources.filter(s=>s.placement==='inline')) {
    i++;
    const needle=e(source.anchor), paragraphs=html.match(/<p>[\s\S]*?<\/p>/g)||[];
    const matches=paragraphs.filter(p=>p.includes(needle));
    if(matches.length!==1) throw new Error('Textanker nicht eindeutig im Absatz: '+source.id);
    const marker='<sup class="research-sup"><a class="research-marker" href="#'+key(source.id)+'" aria-label="Hintergrund '+i+': '+e(source.title)+'">'+i+'</a></sup>';
    html=html.replace(matches[0],matches[0].replace('</p>',' '+marker+'</p>'));
  }
  const inline=catalog.sources.filter(s=>s.placement==='inline');
  const further=catalog.sources.filter(s=>s.placement==='further');
  const item = (s,number) => '<li id="'+key(s.id)+'"><h3>'+(number?number+'. ':'')+e(s.title)+'</h3><p>'+e(s.description)+'</p><p><a href="'+e(s.url)+'" rel="noopener noreferrer" target="_blank">'+e(s.publisher)+' · '+e(s.source_title)+'</a></p></li>';
  const notes='<section class="research-notes" aria-labelledby="research-notes-title">'+
    '<p class="eyebrow">Hinter der Geschichte</p><h2 id="research-notes-title">Weiterführende Hintergründe</h2>'+
    '<p>'+e(catalog.editorial_note)+'</p>'+
    '<ol class="research-list">'+inline.map((s,j)=>item(s,j+1)).join('')+'</ol>'+
    '<h3 class="research-more">Weitere Vertiefungen</h3><ul class="research-list research-further">'+further.map(s=>item(s,null)).join('')+'</ul>'+
    '<p class="research-date">Quellen redaktionell geprüft am '+e(catalog.reviewed_on.split('-').reverse().join('.'))+'. Rechts- und Sicherheitsfragen erfordern immer die Prüfung des konkreten Einzelfalls.</p></section>';
  return {chapterHtml:html,notesHtml:notes};
}
