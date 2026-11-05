// Tiny progressive enhancement. No analytics, cookies, external SDKs or automatic posts.
async function copyToClipboard(value) {
 if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return true;}
 const field=document.createElement('textarea');field.value=value;field.setAttribute('readonly','');field.style.position='fixed';field.style.left='-9999px';document.body.append(field);field.select();
 const result=document.execCommand('copy');field.remove();if(!result)throw new Error('Clipboard unavailable');return true;
}
document.addEventListener('click',async event=>{
 const button=event.target.closest('button[data-share-action]');if(!button)return;
 const wrap=button.closest('[data-share-item]');if(!wrap)return;
 const {shareText:text,shareTitle:title,shareUrl:url}=wrap.dataset;
 const status=wrap.querySelector('.lab-status');const action=button.dataset.shareAction;
 status.textContent='';
 try {
  if(action==='share'&&typeof navigator.share==='function'){
   try {await navigator.share({title,text,url});return;}
   catch(e){if(e?.name==='AbortError')return;}
  }
  const payload=action==='link'?url:text+'\n\n'+url;
  await copyToClipboard(payload);
  status.textContent=action==='link'?'Link kopiert.':'Text und Link kopiert. Du entscheidest, ob du veröffentlichst.';
 } catch {
  status.textContent='Kopieren in diesem Browser nicht möglich. Bitte Beitrag oder Link manuell markieren.';
 }
});