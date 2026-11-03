import { readFileSync } from 'node:fs';
const c = JSON.parse(readFileSync('config/site.json', 'utf8'));
if (c.name !== 'f0lg3nr31ch' || c.subtitle !== 'Nine to Five. And Beyond.') {
  console.error('Invalid brand configuration');
  process.exit(1);
}
console.log('OK: reader configuration valid');
