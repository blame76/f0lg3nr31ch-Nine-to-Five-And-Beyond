# Fachliche Hintergründe zu Romanfolgen – verbindlicher Reader-Workflow

**Stand:** 2026-11-04 · **Status:** redaktionell-technischer Standard · **Entscheidung:** Hauptrepo `docs/decisions/0005-fachquellen-als-zweite-leseebene.md`.

## Nordstern

**Die Prosa erzählt, die Quellen vertiefen.** Links sind eine zweite, freiwillige Leseebene und kein Nachweis dafür, dass fiktive Personen, Verträge oder Vorfälle tatsächlich existieren. Keine Fachvorträge in Figurenrede, keine KI-Sondertexte und kein SEO-Keyword-Tuning am Roman.

## Verbindliches Gate für jede neue Folge

Jeder Kapitel-Eintrag in `content/chapters/index.json` besitzt **eine dokumentierte Rechercheentscheidung** unter `research`. Das ist Pflicht vor `approved`, nicht die Zahl der Links. Entscheidungen:

- `{"status":"pending"}`: Recherche läuft; nur bei `release-candidate` erlaubt. **Blockiert** `approved`.
- `{"status":"linked","reviewed_on":"YYYY-MM-DD","path":"content/references/<id>.json"}`: Es gibt redaktionell ausgewählte, überprüfte Hintergründe. Inhalt, Textanker, URLs und das Datum müssen zu genau diesem Kapitel passen.
- `{"status":"none","reviewed_on":"YYYY-MM-DD","reason":"konkrete nachvollziehbare Begründung"}`: Keine sinnvoll belegbare Vertiefung. Ausdrücklich erlaubt, wenn Links nur Dekoration wären oder den Text beschädigen würden. Keine leere Pflicht-Fußnote erfinden.

`scripts/lib.mjs` kontrolliert den Status und prüft, ob der Quellenkatalog vorhanden ist. `scripts/check.mjs` kontrolliert jeden verlinkten Katalog und die Originalanker. `npm test` sichert das für aktuelle und neue Folgen ab. Eine unprüfbare Referenz darf nicht stillschweigend erscheinen.

## Ablauf (Definition of Done)

1. **Nach dem literarischen Review**, spätestens vor der Freigabe: fertige Szene und konkrete Sachfrage bestimmen. Keine externe Quelle nur zur Auffüllung; keine generischen Links für rein menschliche Motive.
2. **Original recherchieren:** Herausgeber, Titel, konkrete Aussage, Zeitpunkt/Version und Link prüfen. Bevorzugt Primärquellen: Normen, Gesetzestexte, Produktdokumentation, SRE-Handbücher, Behörden und originale Praxisleitfäden. KI-Recherche ist Startpunkt, nicht Freigabe.
3. **Einordnung schreiben:** Der `description`-Text benennt, was die Quelle tatsächlich lehrt, wie sie mit der Szene zusammenhängt und was sie **nicht** beweist. Keine fiktiven Rechtsverstöße ableiten. Für Rechts- und Sicherheitsfragen gilt eine konkrete Kontextprüfung.
4. **Quellenkatalog erstellen:** `content/references/<id>.json`, mit `schema_version`, `chapter_id`, `reviewed_on`, `editorial_note` und `sources[]`. Jede Quelle erhält `id`, `placement` (`inline` oder `further`), `title`, `description`, `publisher`, `source_title`, `url`. Ein `inline`-Eintrag besitzt außerdem den **exakt einmal vorkommenden** Originalwortlaut als `anchor`. Quellen in Lesereihenfolge anordnen.
5. **Sparsamkeit:** Je verlinkter Folge 1–6 Inline-Verweise, optional bis zu 4 vertiefende Quellen unten. Null Quellen bleiben über `research.status=none` möglich. Keine Links im Erzähltext direkt; die kleinen Anker verweisen auf die Liste außerhalb des Romanartikels.
6. **Technische Prüfung:** `npm test`, `npm run check`, `npm run build`. Kein fehlender, doppelter oder versetzter Anker. Unicode/Sonderzeichen und URLs HTML-sicher. Keine Remote-Skripte, Tracker oder Bildeinbindungen. Die unveränderte Erzählung muss nach Entfernen der automatisch gerenderten Markierungen **genau** dem ursprünglichen HTML entsprechen.
7. **Manuelle Prüfung:** Externe Primärquelle direkt öffnen, PDF-Version und Aussage prüfen; reale HTTP-Erreichbarkeit testen (CI validiert nur URL-Form). Mobile, Tastatur/Fokus, Screenreader, Druck, Leseansicht und Reihenfolge prüfen. Bei defekten Links ändern oder entfernen; keine unbemerkte Ersatzquelle.
8. **Autoren- und Release-Gate:** Quellen und Textstellen im PR vorlegen. Autorenabnahme, Rechtsprüfung und Indexierungsfreigabe sind getrennte Entscheidungen. Kein Auto-Merge/Deploy durch Quellenarbeit. Nach einem späteren Merge Live-URL und Links erneut testen; Prüfdatum beim tatsächlichen erneuten Review aktualisieren.

## Darstellung

Der genehmigte Text bleibt eine zusammenhängende `<article class="reader">`-Struktur. Die kleinen nummerierten und tastaturbedienbaren Marker führen per Fragment zu `<section class="research-notes">` **nach** der Folgennavigation und **vor** der fiktiven Agenturkampagne. Die Liste beschreibt den fachlichen Hintergrund, nicht das fiktionale Geschehen. Native Browser-Leseansichten wählen selbst, was sie aus dem Artikel extrahieren. Druck blendet Marker und Quellenblock aus.

## Bisherige Zuordnungen

| Romanfolge | Anker | Weitere Quellen | Inhaltlicher Schwerpunkt |
| --- | ---: | ---: | --- |
| 01 · Die Null am Ende | 4 | 0 | Incident-Kommunikation, administrativer Vertrag vs. Servicezustand, ausdrückliche Übergabe, Fehlerdiagnose ohne riskante Produktivtests |
| 02 · Wer hält die Verantwortung fest? | 6 | 0 | Teamkapazität, offene Rollen, Serviceaufnahme, Incident vs. Dauerbetrieb, DACI, konkrete Leistungszusagen |
| 03 · How to Service | 6 | 2 | Onboarding, Restore, RACI, dokumentierte Entscheidungen, Vertragsübernahme, DSGVO, zusätzlich Payment und Patch-Management |
| 04 · Der zweite Tab (**redaktionell freigegeben 05.11.2026**) | 2 | 1 | Shadow AI, Datenklassifikation / sichere KI-Eingaben, Einordnung möglicher Datenschutzvorfälle |

Die Quellen und Einschränkungen stehen jeweils im JSON-Katalog, nicht in den Prosatexten. **Bewusst nicht aufgenommen:** BFSG in Folge 03 ohne erzählerischen Bezug; pauschaler Vorwurf eines PCI-Verstoßes; unbelegter Schluss, dass ein fehlender Wartungsnachweis fehlende Updates bedeutet.

## Wartung und Grenzen

Bei Änderungen an einer veröffentlichten Folge Quellenanker erneut prüfen. Externe Links regelmäßig redaktionell stichprobenartig kontrollieren; eine HTTP-200-Antwort beweist nicht, dass die Aussage noch auf der Zielseite steht. Bei einer überholten Norm das Datum/die Ausgabe nennen, ggf. Quelle ersetzen und den PR begründen.

Das Quellen-Gate ist **kein** Ersatz für Literaturreview, Rechteklärung, echte Accessibility-Tests oder fachlichen Einzelfallentscheid. Externe Quellen sind keine SEO-Garantien, keine Erlaubnis zur KI-Datennutzung und keine Pflicht zum maschinellen Indexieren.


## Redaktioneller Grundsatz ab Folge 13 (13.11.2026)

Die Quellen sind eine freiwillige zweite Leseebene, kein erklärendes Pflichtprogramm. **Weniger, dafür präzise textbezogene Links** sind einem langen allgemeinen Literaturverzeichnis vorzuziehen; ältere Folgen werden nicht allein wegen dieser Entwicklung umgeschrieben.

Das Feld `editorial_note` wird vom Reader **öffentlich angezeigt**. Es darf deshalb ausschließlich sachliche Hinweise für Leserinnen und Leser enthalten: Einordnung, fachliche Grenze und Fiktionstrennung. **Keine** internen Aufträge, Autorwünsche, Statusmeldungen, QA-Anweisungen oder Produktionsnotizen in diesem Feld. Solche Hinweise stehen in PRs und Redaktionsdokumenten.

Share-Preview-Grafiken der Romanfolgen entstehen **im Reader-Build** aus den versionierten Kampagnendaten; zusätzliche im Chat generierte Bilder werden nicht automatisch verwendet. Zusätzliche Renderings nur bei ausdrücklich beabsichtigter Verwendung und Einbindung.
