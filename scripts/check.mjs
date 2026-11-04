import {readFileSync} from 'node:fs';
import path from 'node:path';
import {validateResearchSources} from './references.mjs';
import {root,readJson,validateManifest} from './lib.mjs';
const manifest=readJson('content/chapters/index.json');
const errors=validateManifest(readJson('config/site.json'),manifest);
for(const chapter of manifest.chapters||[]) {
 if(chapter.research?.status!=='linked') continue;
 const raw=readFileSync(path.join(root,chapter.path),'utf8').replace(/^# [^\n]+\n+/,'');
 const catalog=readJson(chapter.research.path);
 if(catalog.reviewed_on!==chapter.research.reviewed_on) errors.push('Fachliche Prüfdaten widersprechen sich: '+chapter.id);
 errors.push(...validateResearchSources(raw,catalog,chapter.id).map(message=>chapter.id+': '+message));
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('OK: Reader configuration, chapter files, approvals and all research decisions checked.');
