# SEO & GEO – vollständige Publikation Folgenreich
Stand: 18.11.2026. Diese Spezifikation ersetzt die Regeln aus der ursprünglichen Reader-Phase.

## Ziel und Freigaben
Folgenreich ist ein Literatur- und Rechercheprojekt. Roman, real recherchierte Fachtexte, Fiktion, Satire und fiktive Interviews bleiben unterscheidbar. Keine JobPosting-/LocalBusiness-/Angebotsdaten für erfundene Firmen. Die menschliche redaktionelle Verantwortung bleibt unverändert.
Die juristische Gesamtfreigabe bleibt unabhängig von der Indexierung. `public_pages_indexing_approved` steuert öffentliche Seiten; `published_chapters_indexing_approved` steuert ausdrücklich freigegebene Kapitel. Keine Änderung an diesen Flags im SEO-Release. Die gesonderten Rechtsseiten der Partnerwelt bleiben erreichbar, aber noindex; die zentralen Rechtsseiten bleiben im Index.
Die gewünschten öffentlich veröffentlichten Magazin-, Interview-, prscnm- und Satire-Seiten sind über das Manifest zur Indexierung vorgesehen. Statische HTML-Quellen können vor dem Build weiterhin noindex enthalten; entscheidend ist dist/.

## Zentrale Datenquelle
- `config/publications.json`: statische Veröffentlichungen mit URL, Titel, Beschreibung, Rubrik, Schema, Indexierungs- und RSS-Entscheidung.
- `content/chapters/index.json`: freigegebene Romanfolgen inklusive vorhandener Kampagnen- und Quellenmetadaten.
- `POSTS` aus `scripts/partnerwelt-social.mjs`: Social-Labor-Beiträge.
- `scripts/publications.mjs` vereinigt diese Quellen; unbekannte HTML-Ausgaben lassen den Build fehlschlagen, statt unbemerkt aus der Discovery zu verschwinden.
- Der Build synchronisiert Canonical, robots, ergänzende zutreffende JSON-LD-Daten sowie Sitemap, Partnerwelt-Sitemap, llms.txt und RSS. Die Kapiteltexte, Kampagnenbilder und Forschungsquellen werden nicht verändert.
- `lastmod` nur aus einem tatsächlichen, gepflegten Änderungsdatum (optional `modified_on` für Kapitel, `lastmod` für statische Seiten). Keine Freigabedaten als Publikationszeitpunkte und keine erfundenen RSS-pubDates.
- Die Magazinübersicht und die Hauptnavigation verbinden Reader, Magazin und Partnerwelt.
- `llms.txt` ist eine freiwillige Orientierung, kein Rankingfaktor und keine Trainingserlaubnis. ARD- und AI-Katalog bleiben wahrheitsgemäß leer. Robots bleibt offen; kein stillschweigender Wechsel der Training-Crawler-Politik.

## Qualität und Abnahme
Der Build prüft Registrierung aller HTML-Dateien, Sitemap-/llms-Gleichheit, robots/Canonical, JSON-LD, Erreichbarkeit der indexierbaren Seiten über HTML-Links ab der Startseite und RSS-Einträge. Ergänzende Tests prüfen Freigabegrenzen und aktuelle Inhaltstypen. Kein Indexierungsversprechen.
Live-Prüfung nach Deployment erforderlich: HTTP 200/Content-Type aller Discovery-Dateien, HTTP 404 bei unbekannten Pfaden, keine X-Robots-Tag-Sperre, echte Canonicals, Crawler-Zugriff in Cloudflare einschließlich AI Crawl Control, Weiterleitung/Noindex der pages.dev- und Preview-Hosts. Google Search Console: Sitemap einreichen, URL-Prüfung inkl. Magazin und prscnm, tatsächliche Indexierungsabdeckung dokumentieren. Bing Webmaster Tools optional; IndexNow nur bei bewusst konfiguriertem Schlüssel und echten Änderungen.
Keine ungetesteten Cloudflare-Regeln oder DNS-Änderungen aus dem Repository heraus.

Quellen: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap ; https://developers.google.com/search/docs/appearance/ai-features ; https://llmstxt.org/ ; https://developers.cloudflare.com/pages/configuration/serving-pages/
