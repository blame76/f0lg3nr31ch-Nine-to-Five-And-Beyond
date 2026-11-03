# f0lg3nr31ch
**Nine to Five. And Beyond.**

Öffentlicher, statischer Reader eines fortlaufenden Agenturromans. Die Agentur f0lg3nr31ch ist **fiktiv**. Die Website ist außerdem ein offengelegtes Experiment zu KI-gestützter literarischer Entwicklung und SEO/GEO.

Produktionsadresse: https://folgenreich.benjamin-lam.de

## Inhalt

Drei Manuskriptfassungen wurden aus dem getrennten Autoren-Repository als unveränderte Git-Blobs übertragen und in `content/chapters/index.json` mit Quell-Branch und Blob-SHA dokumentiert. **Status: release-candidate.** Diese Übertragung ist noch keine abschließende literarische Freigabe; die Texte sind allerdings in diesem öffentlichen Repository und nach Cloudflare-Build im Web lesbar.

- Die Null am Ende
- Wer hält die Verantwortung fest?
- How to Service

## Build

Node.js 22+ ohne zusätzliche Laufzeit-Abhängigkeiten.

```sh
npm test
npm run check
npm run build
```

Der Build erzeugt ausschließlich statische Dateien in `dist/`, darunter die Seiten `/roman/`, `/experiment/`, `/impressum/`, `/datenschutz/` und `/lizenz/`, sowie `share-preview.png`.

## Cloudflare Pages

Das Repository ist mit Cloudflare Pages verbunden. Konfiguration:

- Framework: **None**
- Production branch: `main`
- Root directory: `/`
- Build command: `npm run check && npm run build`
- Output directory: `dist`
- `NODE_VERSION=22` falls Cloudflare eine Version verlangt

Cloudflare Pages setzt den Deploy nach Push auf `main` automatisch um; GitHub Actions führt zusätzlich die Qualitätsprüfungen aus.

**Canonical und Share-URL:** https://folgenreich.benjamin-lam.de

Der Produktionsstatus ist absichtlich `release_approved: false` und `legal_reviewed_for_launch: false`. Bis zur ausdrücklichen Autorenabnahme sind die Webseiten als Vorschau mit `noindex` ausgezeichnet; strukturierte Literatur-Daten und Sitemap werden erst mit Freigabe publiziert.

## Freigabeprozess

1. Manuskriptversionen und sichtbare Texte abnehmen; im Manifest `approved`, `approved_by`, `approved_at` dokumentieren.
2. Impressum, Cloudflare Pages, Datenverarbeitung und Share-Crawler prüfen; erst danach `legal_reviewed_for_launch` setzen.
3. Nach ausdrücklicher Veröffentlichungserlaubnis `release_approved` setzen.
4. `npm test && npm run check && npm run build` prüfen und per Pull Request veröffentlichen.

**Hinweis:** Ein öffentliches Repository ist öffentlich; `noindex` schützt nicht vor Zugriff und ist keine Vertraulichkeitssperre.

Siehe [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) und [docs/SEO-GEO.md](docs/SEO-GEO.md).
