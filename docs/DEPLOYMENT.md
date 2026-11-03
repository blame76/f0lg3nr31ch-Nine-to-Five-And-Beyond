# Cloudflare Pages – Produktions- und Share-Prüfung

## Hosting

Öffentliche, autoritative Domain: https://folgenreich.benjamin-lam.de

Cloudflare-Pages-Projekt: f0lg3nr31ch-reader; technische Pages-Adresse: https://f0lg3nr31ch-reader.pages.dev

- GitHub: `blame76/f0lg3nr31ch-Nine-to-Five-And-Beyond`
- Production branch: `main`
- Framework: `None`
- Build: `npm run check && npm run build`
- Output: `dist`
- Root: `/`

Kein Wrangler erforderlich. Die Pages-Custom-Domain wird im Cloudflare-Projekt verwaltet; DNS wird beim Domain-Provider domainfactory gepflegt. Den bestehenden DNS-Verbund einschließlich Mail-Einträgen nicht unbesehen ändern.

## Nach dem automatischen Deploy prüfen

1. Startseite `/`, Kapitel `/roman/die-null-am-ende/`, `/roman/wer-haelt-die-verantwortung-fest/`, `/roman/how-to-service/`.
2. Rechtliche Seiten `/experiment/`, `/impressum/`, `/datenschutz/`, `/lizenz/`.
3. `/share-preview.png` liefert HTTP 200, `Content-Type: image/png`, 1200×630.
4. Auf jeder Seite `og:title`, `og:description`, `og:image` und `og:url`; das Bild zeigt auf `https://folgenreich.benjamin-lam.de/share-preview.png`.
5. Canonical zeigt auf die eigene Subdomain; kein Canonical auf `pages.dev`.
6. LinkedIn Post Inspector mit der Custom-Domain testen; Cloudflare-Sicherheitsregeln dürfen LinkedInBot und sein Bild-Crawling nicht blockieren.
7. Vorschau bleibt `noindex` bis zur finalen Abnahme. Robots.txt ist erreichbar, damit Crawler das Noindex-Meta-Tag lesen können.

## Nach finaler Freigabe

Im Manifest `approved`, `approved_by` und `approved_at` eintragen. Dann nach juristischer Prüfung die beiden Flags in `config/site.json` aktivieren. Erst dann erscheinen Sitemap und strukturierte Literatur-Daten; Links zur echten Agentur oder zu echten Jobangeboten werden nicht erfunden. Eine spätere Umstellung auf `f0lg3nr31ch.de` erfordert 301-Weiterleitungen, neue Canonicals und aktualisierte Sitemaps.
