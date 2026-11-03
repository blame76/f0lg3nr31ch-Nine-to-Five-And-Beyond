import {readJson,validateManifest} from './lib.mjs';
const errors=validateManifest(readJson('config/site.json'),readJson('content/chapters/index.json'));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('OK: Reader configuration, chapter files and approvals checked.');
