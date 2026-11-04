# Fachliche Hintergründe zu Romanfolgen

**Stand:** 2026-11-04 · **Geltung:** Reader-Repository. Übergreifende Entscheidung: Hauptrepo `docs/decisions/0005-fachquellen-als-zweite-leseebene.md`.

## Grundregel

Die Geschichte wird nicht zum Fachartikel umgebaut: Quellen unterstützen nur nachvollziehbare sachliche Bezugspunkte, nicht die fiktiven Ereignisse, Personen oder Dialoge. Die Leserfassung in `content/chapters/*.md` bleibt für reine Quellenpflege unverändert. Quellen und Textanker werden separat in `content/references/<kapitel-id>.json` versioniert. Keine SEO-Keywords, versteckten Agenten-Texte oder automatisch erfundenen Fakten in Prosa.

## Darstellung

- Maximal sechs kleine, nummerierte und tastaturbedienbare Anker im Prosatext für diese erste Folge.
- Zu jedem Anker gehört eine menschlich lesbare Erklärung mit externer Originalquelle **nach** dem kompletten Romantext und der Folgennavigation.
- Zusätzliche vertiefende Quellen stehen nur unten, nicht als weitere Ablenkung im Text.
- Das Native-Reader-Layout bleibt `<article class="reader">` mit zusammenhängender Prosa. Die Quellenliste liegt als eigener Abschnitt außerhalb des Artikels. Printansicht blendet die Markierungen und Quellenliste aus.
- Keine Verlinkung als Beweis für eine fiktive Szene; rechtliche, technische und regulatorische Voraussetzungen werden als bedingte Aussagen eingeordnet.
- Links öffnen extern und erhalten `rel="noopener noreferrer"`. Keine Tracker, Fremdskripte oder automatisch geladenen Inhalte.

## Redaktioneller und technischer Ablauf

1. Konkretes Motiv in genehmigter Folge ermitteln; Primärquelle oder verlässlichen Originalstandard lesen. Aussagen von Dritt-KIs sind nur Suchhinweise.
2. URL, Herausgeber, Titel, kurz erläuterten Bezug, ggf. Einschränkung und Prüfdatum dokumentieren; bei PDFs die Fassung berücksichtigen.
3. Einen im veröffentlichten Markdown genau einmal vorkommenden Originalsatz als `anchor` wählen, ohne den Satz zu verändern.
4. `npm test`, `npm run check`, `npm run build` und Diff prüfen. Fehlt ein Anker oder ist er mehrfach vorhanden, müssen Build und Check scheitern.
5. Sichtprüfung: Linkmarker, Keyboard-Fokus, Smartphone, Druck, native Reader View, `noindex`-Gate, Reihenfolge und Quellenlesbarkeit.
6. Korrekturen mit nachvollziehbarem PR und Autorenfreigabe; nach Deployment externe URLs, HTTP-Status und Navigation gesondert prüfen. Externe Links können nachträglich entfallen, daher bei späteren Textrevisionen erneut überprüfen.

## Konkreter Pilot: „How to Service“

Sechs kontextuelle Referenzen: Service-Onboarding (Google SRE), Restore (BSI), Aufgaben- und Ergebnisverantwortung (RACI), dokumentierte Entscheidungen (MADR), Vertragsübernahme (Max-Planck), Auftragsverarbeitung (DSGVO Art. 28).

Zwei zusätzliche Quellen am Kapitelende: PCI SSC zu Zahlungsdienstleistern sowie BSI Patch- und Änderungsmanagement.

**Vorsicht:** Payment-Zuordnung ist nicht automatisch ein PCI-Verstoß. Auch ist die Servicegesellschaft nicht schon aufgrund interner Organisationsverhältnisse Unterauftragsverarbeiter. Unverifizierter Wartungsstand ist kein Nachweis unterlassener Patches. BFSG bleibt für diese Folge bewusst ausgeschlossen, weil es keinen erzählten Anker gibt.

## Grenzen

Quelle ≠ Beleg für die fiktive Handlung; RACI ≠ rechtliche Haftungszuweisung; Quellencheck ≠ Rechtsgutachten; CI ≠ literarische Freigabe; echte SEO/GEO-Wirkung ist gesondert messbar. Bestehende Indexierungs- und rechtliche Release-Gates werden nicht verändert.
