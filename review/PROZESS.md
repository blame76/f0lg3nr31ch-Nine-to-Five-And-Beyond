# Zwei getrennte Reviews – ein nachvollziehbarer Freigabeprozess

## Phase A: Fachliche Prüfung (vor literarischer Bearbeitung)

**A0. Version einfrieren:** konkrete Kapiteldatei, Blob-SHA, Quellenkatalog, Reader-URL, Datum. Keine stillschweigenden Aktualisierungen des Prüfobjekts.

**A1. Text vollständig lesen:** konkrete Aussagen zu Technik, Abläufen, Verträgen, Organisation und Sicherheit markieren; unterscheiden zwischen Handlung, Figurenmeinung, Fachhinweis und überprüfbarer Allgemeinaussage. Keine Annahme, dass eine Romanfigur recht hat.

**A2. Expertenbedarf aus Aussagen ableiten:** minimale fachliche Rolle wählen; „nice to have“ nicht als Pflicht ausgeben. Fachfragen, mögliche Folgen einer falschen Darstellung und Belege formulieren. Bei Rechtsfragen ist juristischer Rat als solcher zu kennzeichnen.

**A3. Befund prüfen:** Primärdokumentation, Standards und unabhängige Praxisbelege gegeneinander halten. **Zitiert** bedeutet nicht **bestätigt**. Offene fachliche Fragen ausdrücklich offen lassen. Unabhängiges Review nur dokumentieren, wenn es stattgefunden hat.

**A4. Befundentscheidung:** `Fehler` / `Plausibilitätslücke` / `begründete Vereinfachung` / `ungeprüft` / `kein Änderungsbedarf`. Für echte Fehler mit hoher Wirkung ein Korrektur-PR, sonst begründete Priorisierung.

**Fach-Gate:** Sachfehler von hoher Schwere behoben oder mit offenem Risiko und Autorentscheidung dokumentiert. Keine automatische Freigabe allein wegen Quellenzahl oder KI-Review. Danach Phase B.

## Phase B: Entwicklungslektorat

**B1. Werk- und Figurenanalyse:** Wer will was, wer hindert wen, was kostet die Entscheidung? Perspektive, Wissensstand und Kontinuität prüfen; eigene Erzählung von Nora, Miriam, Leon, Jamal, Martin und Alex ernst nehmen.

**B2. Szenen und Dramaturgie:** Einstieg, Konflikt, Wendepunkt, Konsequenz, Ende; prüfen, ob Fachabschnitte eine Handlung tragen oder nur demonstrieren. Motivwiederholung bewusst gegen redundante Erklärung abwägen.

**B3. Dialog, Ton und Rhythmus:** unterscheidbare Figurenstimmen; Subtext statt referierter Best Practices; keine künstliche Krise, kein „Lehrbuch-Dialog“. Den lakonischen Ton schützen.

**B4. Testlesung:** mindestens eine Person ohne Softwarepraxis. Drei ungestützte Fragen: Worum ging es? Was wollte die Figur? Warum lese ich weiter? Nicht über Fachbegriffe abfragen.

**B5. Eingriffe priorisieren:** Strukturänderung vor Satzpolitur. Maximal drei Hauptbefunde pro Folge in einer Überarbeitungsrunde; jeweils **Zitat/Fundstelle → Wirkung auf Leser → kleinstmöglicher Vorschlag → befürchtete Nebenwirkung**.

**Literatur-Gate:** Autor entscheidet begründet über Annahme, Ablehnung oder Vertagung. Kein „Score“ ersetzt Urteil und keine Zielbewertung erzwingt zusätzliche Dramatik.

## Sichtbare Korrekturkette

1. GitHub Issue mit Kategorie, Originalfundstelle und erwarteter Leser-/Praxiswirkung.
2. Fachliche und redaktionelle Kommentare im Issue, inklusive Gegenpositionen.
3. Autorentscheidung im Issue.
4. **Getrennter** Kapitel-PR mit Text-Diff, Link zum Issue, Kontinuitäts- und Regres­sionsnotiz; keine unautorisierten Mehrfachänderungen.
5. Reader-Tests/Checks und menschliches Gegenlesen; Merge nur nach Autorenfreigabe.
6. Leserfassung **nach Deployment** verifizieren (URL, Anker, neue Fassung); Issue mit Commit/URL schließen.

## Befundklassifizierung

| Kennung | Bedeutung | Vorgehen |
| --- | --- | --- |
| F0 | belegter gefährlicher/schwerer Sachfehler | blockieren; Quelle/Gegencheck notwendig |
| F1 | plausibilitätsgefährdende sachliche Unschärfe | Fachperson/Quelle und gezielte Änderung prüfen |
| F2 | fachlich mögliche, literarisch vertretbare Abkürzung | begründen; häufig unverändert lassen |
| L1 | Substanz-/Figuren-/Plotproblem | Entwicklungslektorat mit Alternativen |
| L2 | Tempo, Dialog, Perspektive, Wiederholung | kleinste Lösung vorschlagen |
| Q | offene Frage/Hypothese | nicht als Tatsache veröffentlichen |

**Definition of done:** Snapshot verlinkt; Prüfrollen bestimmt; offene F0/F1 dokumentiert; L1/L2 entschieden; Änderungen mit Tests und Vorher/Nachher erfasst; Autorfreigabe und Live-Prüfung nachvollziehbar. Ein ungelöstes Q blockiert nur, wenn daraus ein wichtiger inhaltlicher oder sicherheitsbezogener Sachfehler entstehen kann.

## Unabhängigkeit

Ein KI-Assistent darf Befunde ermitteln, Gegenargumente liefern und Korrekturen vorschlagen. Er ist dadurch **kein unabhängiger Sachverständiger und kein menschlicher Testleser**. Eine Person sollte erst als Expertin/Experte oder Testleser genannt werden, wenn die Mitarbeit tatsächlich stattgefunden hat und die Nennung freigegeben ist.
