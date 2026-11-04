import {readFileSync} from 'node:fs';
import {validateResearchSources} from './references.mjs';
import {readJson,validateManifest} from './lib.mjs';
const errors=validateManifest(readJson('config/site.json'),readJson('content/chapters/index.json'));
const referenceText=readFileSync('content/chapters/how-to-service.md','utf8').replace(/^# [^\n]+\n+/,'');
errors.push(...validateResearchSources(referenceText,readJson('content/references/how-to-service.json')));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('OK: Reader configuration, chapter files, approvals and research sources checked.');
