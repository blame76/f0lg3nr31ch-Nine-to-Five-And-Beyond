# SEO-/GEO-Experiment – 24.11.2026

Ausgangslage: Laut Autor meldet Google Search Console „Discovered – currently not indexed“. Kein eigener Zugriff auf die Search Console. Im Quellstand der Startseite waren bereits WebSite-JSON-LD, Canonical- und Indexierungslogik vorhanden. Der bisherige Seitentitel lautete `Nine to Five. And Beyond. | f0lg3nr31ch`.

## Intervention

- Deutscher, beschreibender Seitentitel und Meta-Description.
- Kurze sichtbare Einordnung des Romans und seiner fiktiven Teilwelten, direkter Einstieg in Folge 1.
- WebSite-Name Folgenreich mit den bisherigen Markennamen als Alternativen.
- Keine Änderung der Kapitelprosa, URLs, Freigabeflags, Crawler-Regeln oder Hauptdomain. Bestehendes Book-/Chapter-Modell bleibt erhalten.

## Abnahme und Beobachtung

Vor Merge: `npm test`, `npm run check`, `npm run build`. Nach Deployment: HTTP-Status, Canonical, Robots-Meta und Header, Sitemap, JSON-LD sowie Einstiegslink prüfen. Search Console: ausgewählte URLs einmalig zur Indexierung einreichen; Status am 08.12. und 22.12. dokumentieren. Kein kausaler Nachweis durch bloßen Vorher-Nachher-Vergleich. Prüfungen sind zum Zeitpunkt dieser Dokumentation noch offen.

Maschinenlesbare Begleitdatei: [JSON](seo-experiment-2026-11-24.json).
