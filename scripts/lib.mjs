import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
export const root = path.resolve(import.meta.dirname,'..');
export const readJson = file => JSON.parse(readFileSync(path.join(root,file),'utf8'));
export const escapeHtml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
export const normUrl = value => value ? String(value).replace(/\/$/,'') : null;
export const absoluteUrl = (base,slug='') => base ? base + '/' + String(slug).replace(/^\//,'') : null;
export function validateManifest(config,manifest,base=root) {
  const errors=[];
  if(config.name!=='f0lg3nr31ch'||config.subtitle!=='Nine to Five. And Beyond.') errors.push('Brand name/subtitle must remain exact');
  if(config.site_url!==null && !(typeof config.site_url==='string' && /^https:\/\/[^/]+\.[^/]+\/?$/.test(config.site_url))) errors.push('site_url must be null or HTTPS origin');
  if(manifest.schema_version!==1 || !Array.isArray(manifest.chapters)) errors.push('Invalid chapters manifest');
  if(config.release_approved===true && (!config.site_url || config.legal_reviewed_for_launch!==true || !manifest.chapters?.length || manifest.chapters.some(c=>c.status!=='approved'))) errors.push('Release requires domain, legal review and approved chapters');
  const ids=new Set();
  for(const c of manifest.chapters||[]){
    if(!c||typeof c!=='object') {errors.push('Invalid chapter entry');continue;}
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.id||'')) errors.push('Invalid slug: '+c.id);
    if(ids.has(c.id)) errors.push('Duplicate ID: '+c.id);ids.add(c.id);
    if(!['release-candidate','approved'].includes(c.status)) errors.push('Invalid public chapter status: '+c.id);
    if(!c.title||!c.description||c.description.length>300) errors.push('Missing metadata: '+c.id);
    if(c.path!==`content/chapters/${c.id}.md` || !existsSync(path.join(base,c.path||''))) errors.push('Missing or invalid text path: '+c.id);
    if(!/^[a-f0-9]{40}$/.test(c.source_blob_sha||'')) errors.push('Missing source provenance: '+c.id);
    if(c.status==='approved'&&(!c.approved_by||!/^\d{4}-\d{2}-\d{2}$/.test(c.approved_at||''))) errors.push('Approval missing: '+c.id);
  }
  return errors;
}
const inline=s=>escapeHtml(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
export function markdownToHtml(markdown){
  const lines=markdown.replace(/\r\n?/g,'\n').split('\n');
  const html=[];let paragraph=[];let quote=[];
  const flush=()=>{if(paragraph.length){html.push('<p>'+inline(paragraph.join(' '))+'</p>');paragraph=[];}if(quote.length){html.push('<blockquote><p>'+inline(quote.join(' '))+'</p></blockquote>');quote=[];}};
  for(const raw of lines){
    const s=raw.trim();
    if(!s){flush();continue;}
    const heading=s.match(/^(#{1,3})\s+(.+)$/);if(heading){flush();const n=heading[1].length;html.push('<h'+n+'>'+inline(heading[2])+'</h'+n+'>');continue;}
    if(/^(?:\*{3,}|-{3,})$/.test(s)){flush();html.push('<hr>');continue;}
    if(s.startsWith('> ')){if(paragraph.length)flush();quote.push(s.slice(2));continue;}
    if(quote.length)flush();paragraph.push(s);
  }
  flush();return html.join('\n');
}
