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

## SEO / Agentic Browsing: Live-Abnahme nach dem Merge (04.11.2026)

Der erfolgreiche GitHub-/Cloudflare-Build **belegt allein noch keinen 4/4-Wert auf der Custom-Domain**.

1. `/` muss HTTP 200, `text/html`, Canonical auf die Custom-Domain und `robots=index,follow` liefern.
2. `/roman/how-to-service/` bleibt bis zur expliziten Autoren-/Rechtsfreigabe `noindex,follow`, obwohl der Text direkt erreichbar ist.
3. `/llms.txt` muss HTTP 200 `text/plain`, eine H1 und Markdown-Links auf die bestehenden öffentlichen Einstiegs-/Hintergrundseiten liefern (ohne einzelne unfreigegebene Kapitel-URLs).
4. `/.well-known/ard.json` liefert HTTP 200 `application/json`, genau `{"entries":[]}`; `/.well-known/ai-catalog.json` liefert HTTP 200 JSON mit `{"specVersion":"1.0","entries":[]}`. Das sind **leere** Kataloge, keine erfundenen Tools. Falls Lighthouse das alte Schema prüft, ist dessen Alias vorhanden.
5. `/sitemap.xml` enthält nur indexierbare Seiten; `/feed.xml` fehlt vor Kapitel-Freigabe. Unbekannte Pfade liefern echte 404.
6. Danach PageSpeed/Lighthouse auf `https://folgenreich.benjamin-lam.de/` erneut ausführen: Agentic-Browsing-Ziel **4/4** als Abnahmekriterium, nicht als behauptetes Ergebnis. Accessibility Tree, CLS, llms.txt und ARD-Audit einzeln dokumentieren. Bei anderem Nenner oder nicht anwendbaren Audits Einzelresultate statt künstlicher 4/4 berichten.

Wenn die Custom-Domain etwas anderes ausliefert als das erfolgreiche Pages-Deployment, zunächst Custom-Domain/DNS, Cloudflare-Zuordnung, Caching und ggf. Edge-Regeln prüfen. Kein künstliches Setzen von `legal_reviewed_for_launch` oder Kapitelstatus.
