# Vorlagen für öffentlich nachvollziehbare Reviews

## Fachbefund – GitHub Issue

```md
Titel: [F1 / Folge XX] Kurze präzise Aussage
Kapitel und Blob-SHA:
Reader-Link / Textstelle (kleines Zitat):
Aussagetyp: Figurensicht | überprüfbare Sachbehauptung | Vereinfachung
Benötigte Fachperspektive (nicht Name einer erfundenen Person):
Behauptung / fachliche Frage:
Warum relevant – praktisches Risiko:
Belege (Primärquelle, Datum, Gegenquelle):
Gegenargument / offene Unsicherheit:
Kleinste zulässige Korrektur oder „kein Änderungsbedarf“:
Status: erfasst | fachlich offen | fachlich geprüft | Autorenentscheidung | Umsetzung | verifiziert
Prüfende Person/Art der Prüfung (KI-/menschlich, nur tatsächlich erfolgt):
Entscheidung / Verweis auf PR:
```

## Entwicklungslektorat – GitHub Issue

```md
Titel: [L1 / Folge XX] Figur / Plot / Stimme / Rhythmus
Quelle mit Blob-SHA und Szene:
Beobachtung (Zitat sparsam):
Leserwirkung, nicht Geschmacksbehauptung:
Figurenwunsch + Hindernis + Entscheidung + Konsequenz:
Empfehlung A – kleinster Eingriff:
Alternative B – bewusst nicht ändern:
Möglicher Verlust durch die Änderung:
Rückmeldung unkundiger Testleser (nur wenn real durchgeführt):
Autorenentscheidung und Begründung:
Korrektur-PR:
```

## Korrektur – Pull Request

```md
Motivation / verlinkte Issue(s):
Genaue Fassung / Blob-SHA des Ausgangstextes:
Vorher/Nachher (kein vollständiger Doppelabdruck):
Kleinstmögliche Änderung:
Fachliche Belegprüfung:
Figuren-/Kontinuitätsprüfung:
Unbeabsichtigte Folgen / Gegenargument:
Teststatus (technisch, Lesetest, Live-Prüfung jeweils getrennt):
Autor hat Textänderung freigegeben: ja/nein (Datum/Beleg):
Merge- und Deployment-Ergebnis:
```

### Qualitätsregel

Ohne verlinkten Befund keine unbegründete Textumschreibung. Ohne dokumentierte Autorenfreigabe kein Merge eines korrigierten Kapitels. Offen gebliebene Gegenmeinungen dürfen sichtbar bleiben.
