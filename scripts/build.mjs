import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const site = JSON.parse(readFileSync('config/site.json', 'utf8'));
mkdirSync('dist', { recursive: true });
const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>f0lg3nr31ch – Nine to Five. And Beyond.</title><meta name="description" content="Ein fortlaufender Roman und transparentes SEO/GEO-Experiment. Die Agentur f0lg3nr31ch ist fiktiv."><style>body{font:1.15rem/1.7 system-ui,sans-serif;margin:0;color:#24292e;background:#f8f8f6}main{max-width:47rem;padding:clamp(2rem,6vw,6rem) 1.5rem;margin:auto}h1{font-size:clamp(2.5rem,7vw,5rem);letter-spacing:-.05em;line-height:1.05;margin-bottom:.3em}p{max-width:39rem}.tag{font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;color:#565d64}a{color:#165e87}</style></head>
<body><main><p class="tag">Roman · Experiment · Vorschau</p><h1>f0lg3nr31ch</h1><p><strong>Nine to Five. And Beyond.</strong></p><p>Ein fortlaufender Agenturroman über Menschen, Arbeit und die Folgen ihrer Entscheidungen.</p><p>Die Agentur ist erfunden. Dies ist ein transparentes Experiment über KI-gestützte Romanentwicklung und Auffindbarkeit in Suchmaschinen.</p><p>Der Reader und die drei Manuskriptfassungen werden für die öffentliche Freigabe vorbereitet. Noch kein freigegebener Kapitel-Release.</p><p><a href="https://github.com/blame76/f0lg3nr31ch-Nine-to-Five-And-Beyond">Öffentliches Reader-Repository</a></p></main></body></html>`;
writeFileSync('dist/index.html', html, 'utf8');
writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n', 'utf8');
console.log('Static preview generated in dist/; noindex until final approval');
