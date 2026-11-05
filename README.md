# f0lg3nr31ch – Nine to Five. And Beyond.

Ein fortlaufender Agenturroman. Die Agentur, ihre Stellenangebote und Serviceversprechen sind fiktiv.

**Lesen:** https://folgenreich.benjamin-lam.de

**Partnerwelt:** https://folgenreich.benjamin-lam.de/partnerwelt/ – drei fiktive, ausdrücklich gekennzeichnete Firmen mit praxisnahen Angeboten und eigens generierten KI-Bildern.

**Social-Labor:** https://folgenreich.benjamin-lam.de/partnerwelt/share/ – sechs ausdrücklich fiktive Social-Media-Beiträge mit eigenen Bildern und jeweils einer kurzen „Warum so?“-Erklärung. Technischer Hintergrund: [Social-Labor](docs/SOCIAL-LAB.md).

## Die Geschichten

1. Die Null am Ende
2. Wer hält die Verantwortung fest?
3. How to Service

4. Der zweite Tab
5. Verfügbar

**Redaktionell am 05.11.2026 freigegeben:** Folge 04 „Der zweite Tab“ mit Rezept-Share-Preview aus der Admin-Küche und freiwilligen Quellen zu Shadow AI und Datenschutz. Die Aufnahme in den öffentlichen Reader ist keine abgeschlossene juristische Prüfung oder Freigabe zur Suchmaschinenindexierung.

**Neu (05.11.2026):** Folge 05 „Verfügbar“ folgt Jamal durch einen KI-gestützten Arbeitstag. Die im Lesetext gekennzeichnete fiktive Anzeige führt zum [Social-Labor „Vier Stunden. Zwei Uhren.“](https://folgenreich.benjamin-lam.de/partnerwelt/share/vier-stunden-zwei-uhren/). Die eigenständige [fiktive Streamingkampagne prscnm](https://folgenreich.benjamin-lam.de/partnerwelt/prscnm/) ist als zweites Experiment angebunden. [Quellen zur Folge](https://folgenreich.benjamin-lam.de/partnerwelt/prscnm/hinter-den-kulissen/).

Jede Romanfolge hat eine eigene fiktive Agenturkampagne für Social Previews. Die Kapiteltexte stehen beim Lesen im Vordergrund.

## Statische Website

Der Reader benötigt Node.js 22 oder neuer und keine Laufzeitbibliotheken. Zum lokalen Prüfen und Erzeugen der HTML-Seiten:

```sh
npm test
npm run check
npm run build
```

Die erzeugten Dateien stehen in `dist/`. Deployment erfolgt über Cloudflare Pages vom Branch `main`.

## Über das Experiment

Der Roman entsteht mit Unterstützung von KI. Mehr über die Geschichte und den Schreibprozess steht auf der Seite [Über das Projekt](https://folgenreich.benjamin-lam.de/experiment/).

Vor der Freigabe zur Suchmaschinenindexierung gelten Qualitäts- und Rechtsprüfungen. Technische Hinweise: [Veröffentlichung](docs/RELEASE.md), [Leseansicht](docs/READING-MODE.md), [fachliche Quellen](docs/RESEARCH-SOURCES.md) und [SEO/GEO](docs/SEO-GEO.md). Für **jede neue Folge** ist vor Freigabe eine dokumentierte Entscheidung über geprüfte Links oder bewusst keine Verweise Pflicht; die Zahl der Links ist keine Qualitätsmetrik.

Das Repository ist öffentlich einsehbar. Daraus folgt keine allgemeine Lizenzfreigabe für den Roman oder den Website-Code.
