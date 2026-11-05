import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
export const root = path.resolve(import.meta.dirname,'..');
export const readJson = file => JSON.parse(readFileSync(path.join(root,file),'utf8'));
export const escapeHtml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
// Social crawlers sometimes misread UTF-8 bytes: ASCII-only numeric entities in metadata preserve meaning.
export const escapeMeta = value => escapeHtml(value).replace(/[^\x00-\x7F]/gu,ch=>'&#'+ch.codePointAt(0)+';');
export const normUrl = value => value ? String(value).replace(/\/$/,'') : null;
export const absoluteUrl = (base,slug='') => base ? base + '/' + String(slug).replace(/^\//,'') : null;
export function validateManifest(config,manifest,base=root) {
  const errors=[];
  if(config.name!=='f0lg3nr31ch'||config.subtitle!=='Nine to Five. And Beyond.') errors.push('Brand name/subtitle must remain exact');
  if(config.site_url!==null && !(typeof config.site_url==='string' && /^https:\/\/[^/]+\.[^/]+\/?$/.test(config.site_url))) errors.push('site_url must be null or HTTPS origin');
  if(typeof config.public_pages_indexing_approved!=='boolean') errors.push('public_pages_indexing_approved must be boolean');
  if(typeof config.published_chapters_indexing_approved!=='boolean') errors.push('published_chapters_indexing_approved must be boolean');
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
    // Each public chapter has an explicit, reviewed research decision, even when no links are suitable.
    const research=c.research;
    if(!research || !['linked','none','pending'].includes(research.status)) errors.push('Missing research decision: '+c.id);
    else {
      if(research.status==='pending' && c.status==='approved') errors.push('Approved chapter requires completed research decision: '+c.id);
      if(research.status!=='pending' && !/^\d{4}-\d{2}-\d{2}$/.test(research.reviewed_on||'')) errors.push('Research review date missing: '+c.id);
      if(research.status==='linked' && (research.path!==`content/references/${c.id}.json` || !existsSync(path.join(base,research.path||'')))) errors.push('Missing research catalog: '+c.id);
      if(research.status==='none' && (research.path || typeof research.reason!=='string' || research.reason.trim().length<30)) errors.push('Unlinked chapter requires documented rationale: '+c.id);
    }

  }
  for(const c of manifest.chapters||[]){
    if(!c || typeof c!=='object') continue;
    const campaign=c.campaign;
    if(!campaign || typeof campaign!=='object'){errors.push('Missing fictional campaign: '+c.id);continue;}
    const fields=['category','headline','subheadline','promise','context','seo_title','seo_description','social_title','social_description','image_alt'];
    for(const name of fields) if(typeof campaign[name]!=='string'||campaign[name].trim().length<6||campaign[name].length>320) errors.push('Invalid campaign '+name+': '+c.id);
    if(campaign.image!=='share/'+c.id+'.png') errors.push('Invalid social image path: '+c.id);
    if(!/^#[0-9a-fA-F]{6}$/.test(campaign.accent||'')) errors.push('Invalid image accent: '+c.id);
    for(const name of ['image_lines','image_detail']){
      if(!Array.isArray(campaign[name])||campaign[name].length<1||campaign[name].length>3||
         campaign[name].some(s=>typeof s!=='string'||s.length>42||!/^[A-Z0-9 .&/-]+$/.test(s))) errors.push('Invalid campaign '+name+': '+c.id);
    }
    if(!/fiktiv|roman/i.test(campaign.seo_description+' '+campaign.social_description)) errors.push('Fiction disclosure missing: '+c.id);
    if(!/fiktiv/i.test(campaign.category+' '+campaign.image_alt)) errors.push('Fiction label missing: '+c.id);
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
