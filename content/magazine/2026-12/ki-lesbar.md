# KI-lesbar. Aber liest die KI auch?

Ein praktisches Experiment über die Grenzen von SEO, GEO und maschineller Kontextverifizierung.

Eine Website ist öffentlich erreichbar, technisch sauber aufgebaut und für Suchmaschinen optimiert. Ihre Inhalte stehen zusätzlich in maschinenlesbaren Formaten zur Verfügung. Dennoch kann ein KI-System bei einer konkreten Anfrage daran scheitern, diese Inhalte abzurufen.

Problematischer wird es, wenn das System trotzdem eine überzeugende Antwort liefert.

Die zunehmende Integration generativer künstlicher Intelligenz in Recherche-, Beratungs- und Entwicklungsprozesse macht eine Unterscheidung notwendig: die zwischen der Verfügbarkeit von Informationen und ihrer nachweisbaren Verwendung.

## 01 — Von der Auffindbarkeit zur Verarbeitung

Search Engine Optimization, kurz SEO, beschäftigt sich mit der Auffindbarkeit von Inhalten über Suchmaschinen.

Mit Generative Engine Optimization, kurz GEO, ist eine weitere Perspektive hinzugekommen. Inhalte sollen nicht mehr ausschließlich in Suchergebnissen erscheinen, sondern auch innerhalb generativ erzeugter Antworten berücksichtigt werden.

Aggarwal et al. stellten 2024 auf der ACM SIGKDD Conference on Knowledge Discovery and Data Mining einen Ansatz zur systematischen Untersuchung dieser Sichtbarkeit vor. Die Arbeit zeigt, dass die Aufbereitung von Inhalten deren Präsenz in generativen Antworten beeinflussen kann. Die Ergebnisse variieren allerdings je nach Themengebiet und untersuchtem System. [1]

Daraus folgt kein universelles Optimierungsrezept.

Und es bleibt eine Frage offen: Hat das KI-System bei einer konkreten Anfrage tatsächlich mit dem Dokument gearbeitet, auf das sich seine Antwort vermeintlich bezieht?

Für Unternehmen ist diese Frage nicht ausschließlich eine Angelegenheit des Marketings.

Wer eine KI mit der Prüfung eines Vertrags, einer technischen Dokumentation, eines Angebots oder einer betrieblichen Arbeitsanweisung beauftragt, erwartet mehr als eine allgemein plausible Antwort.

Er erwartet die Verarbeitung einer bestimmten Informationsgrundlage.

## CASE STUDY — HTTP 200. Kontext unbekannt.

*Fiktive Fallstudie aus der Romanwelt von Folgenreich. Die Agentur, die Untersuchung und die nachfolgenden Versuchsergebnisse sind erfunden. Sie orientieren sich an realen technischen Problemstellungen und stellen keine Messungen realer KI-Anbieter dar.*

### Der Auftrag

Die Agentur hatte ihren internen Jahresplaner für den E-Commerce überarbeitet.

Unter dem Titel „365 Tage E-Commerce“ entstand ein abteilungsübergreifendes Arbeitsmittel für Marketing, Administration, Entwicklung, Logistik, Personalplanung, Controlling, Einkauf und Kundenservice.

Leon sollte prüfen lassen, ob das Dokument fachlich vollständig und für kleinere Handelsunternehmen verständlich war.

Für die Untersuchung wurde eine öffentliche Kopie ohne Kunden- oder Unternehmensdaten bereitgestellt. Die Inhalte standen als HTML, Markdown, TXT und JSON zur Verfügung.

Leon übermittelte drei KI-Assistenten denselben Prüfauftrag.

Die erste Antwort war ausführlich. Der Assistent lobte die Struktur, die wirtschaftliche Betrachtung und die Sicherheitsmaßnahmen.

Der zweite Assistent beschrieb die Navigation, erklärte jedoch, die verlinkten Fachbereiche nicht erreichen zu können.

Der dritte Assistent verwies auf einen fehlgeschlagenen Dokumentenabruf und verzichtete auf eine Bewertung.

Leon leitete die Ergebnisse an Alex weiter.

„Kannst du einmal prüfen, warum die nicht auf unsere Seiten kommen?“

### Die technische Prüfung

Alex überprüfte die Erreichbarkeit der veröffentlichten Ressourcen, die Weiterleitungen, HTTP-Header, Crawler-Regeln und die tatsächlich ausgelieferten Inhalte.

Die eigenen Testabrufe verliefen erfolgreich.

Damit war zunächst nur nachgewiesen, dass die Agentur selbst die Dokumente abrufen konnte.

Ob die Antworten der KI-Assistenten auf denselben Dokumenten beruhten, war weiterhin unklar.

Die ausführlichste Bewertung enthielt keine eindeutig überprüfbaren Fundstellen und keine Angaben zur Dokumentversion.

Alex änderte den Prüfauftrag.

Statt den Jahresplaner unmittelbar bewerten zu lassen, sollten die Systeme zunächst einzelne Informationen aus dem Dokument wiedergeben.

### Auszug aus dem internen Prüfbericht

**Dokument:** 365 Tage E-Commerce

**Referenzversion:** 0.2.0

**Prüfgegenstand:** Wirtschaftlichkeit einer Rabattaktion

**Verantwortlich:** Alex

**Fachliche Koordination:** Leon

Die Referenzfassung enthielt folgendes vereinfachtes Rechenbeispiel:

| Kennzahl | Regelgeschäft | Rabattaktion |
| --- | --- | --- |
| Bestellungen | 100 | 150 |
| Nettoerlös | 8.000 € | 9.600 € |
| Deckungsbeitrag | 2.500 € | 750 € |

Die KI-Assistenten sollten die Dokumentversion, die beiden Deckungsbeiträge und eine konkrete Passage zur Vertretungsregelung wiedergeben.

| Prüfung | Assistent A | Assistent B | Assistent C |
| --- | --- | --- | --- |
| Eigener Bericht über Zugriff | Erfolgreich | Unvollständig | Fehlgeschlagen |
| Dokumentversion richtig | Ja | Nein | Keine Angabe |
| Beide Deckungsbeiträge richtig | Nein | Keine Angabe | Keine Angabe |
| Textstelle korrekt zitiert | Nein | Nein | Keine Angabe |
| Unabhängiger Abrufnachweis | Offen | Offen | Offen |
| Fehlenden Kontext offengelegt | Nein | Ja | Ja |
| Grundlage für vollständiges Fachreview ausreichend | Nein | Nein | Nein |

*Illustrative, vollständig fiktive Versuchsergebnisse.*

Keiner der drei Assistenten hatte eine ausreichende Grundlage für die vollständige fachliche Prüfung nachgewiesen.

Die technisch erfolgreiche Bereitstellung der Website hatte daran nichts geändert.

Im Anschluss stellte Leon die Referenzdatei direkt als Dokument bereit. Nun konnten alle drei Assistenten die geforderten Informationen korrekt wiedergeben.

Für Alex war damit noch nicht bewiesen, dass die Systeme sämtliche Inhalte vollständig verarbeitet hatten. Die Ergebnisse lieferten aber wesentlich bessere Anhaltspunkte dafür, dass ihnen zumindest die relevanten Textabschnitte vorlagen.

Der ursprüngliche Prüfauftrag wurde um einen vorgeschalteten Kontextnachweis ergänzt.

In der internen Dokumentation der Agentur entstand daraus eine neue Qualitätsanforderung:

**Vor der Bewertung einer Informationsgrundlage ist deren Identität und ausreichende Verfügbarkeit zu prüfen.**

*Ende der fiktiven Fallstudie.*

## 02 — HTTP 200 ist kein Nachweis gelesener Inhalte

Der erfolgreiche Abruf einer Webressource lässt sich vergleichsweise einfach überprüfen.

Ein HTTP-Statuscode 200 signalisiert bei einer gewöhnlichen GET-Anfrage zunächst eine erfolgreiche Verarbeitung der Anfrage. [9]

Er sagt allerdings nicht, ob der zurückgegebene Inhalt dem erwarteten Dokument entspricht. Auch eine Fehlerseite, eine vorgeschaltete Sicherheitsprüfung oder eine unvollständige Darstellung kann unter Umständen mit einem erfolgreichen Statuscode ausgeliefert werden.

Bei KI-gestützten Abrufen kommen weitere Verarbeitungsschritte hinzu.

| Verarbeitungsschritt | Mögliche Fehlerquelle |
| --- | --- |
| Auswahl der Ressource | Falsche oder rekonstruierte URL |
| Technischer Abruf | DNS, Weiterleitung, Zugriffssperre |
| Inhaltsextraktion | Nur Navigation oder Seitentitel erfasst |
| Dokumentauswahl | Veraltete Version aus Index oder Cache |
| Kontextaufbereitung | Relevante Abschnitte werden gekürzt |
| Antwortgenerierung | Aussagen werden ohne ausreichenden Bezug ergänzt |
| Quellenangabe | Zitat oder URL passt nicht zur Aussage |

Selbst wenn sämtliche Schritte bis zur Inhaltsextraktion erfolgreich waren, ist damit nicht sichergestellt, dass alle relevanten Informationen bei der Generierung der Antwort berücksichtigt werden.

Der Website-Betreiber kontrolliert nur einen Teil dieser Verarbeitungskette.

## 03 — Vier unterschiedliche Qualitätsebenen

Für die Bewertung digitaler Informationsangebote ist es deshalb sinnvoll, vier Ziele voneinander zu unterscheiden.

| Ebene | Fragestellung | Mögliche Prüfung |
| --- | --- | --- |
| Accessibility | Können Menschen die Inhalte barrierefrei nutzen? | Manuelle und automatisierte Prüfungen |
| SEO | Können Suchmaschinen Inhalte finden und indexieren? | Crawl- und Indexierungsdaten |
| GEO | Werden Inhalte in generativen Antworten berücksichtigt? | Wiederholte Abfragen und Sichtbarkeitsmessungen |
| Context Verification | Wurde der für die Aufgabe vorgesehene Kontext tatsächlich verarbeitet? | Versionsabgleich, Inhaltsproben, Herkunfts- und Abrufnachweise |

Diese Ebenen sind keine zwingend aufeinanderfolgenden Entwicklungsstufen.

Ein KI-System kann über einen Datei-Upload oder eine angebundene Dokumentenschnittstelle Informationen verarbeiten, die für Suchmaschinen vollständig unsichtbar sind.

Umgekehrt kann ein Dokument prominent in Suchergebnissen erscheinen, ohne einer bestimmten KI-Anwendung vollständig zur Verfügung zu stehen.

Auch Accessibility darf nicht mit maschineller Lesbarkeit gleichgesetzt werden. Eine für Screenreader zugängliche Website kann viele technische Eigenschaften besitzen, die auch Agenten helfen. Die Anforderungen menschlicher Nutzer bleiben dennoch eigenständig.

## 04 — Braucht jede Website eine llms.txt?

Mit der zunehmenden Nutzung generativer Suchsysteme entstehen neue Empfehlungen für die technische Aufbereitung von Websites.

Eine davon ist die Bereitstellung einer llms.txt.

Jeremy Howard schlug 2024 eine Konvention vor, die KI-Systemen einen vereinfachten Zugang zu den wesentlichen Informationen einer Website ermöglichen soll. Die im August 2026 aktualisierte Fassung erweitert diesen Ansatz für moderne agentische Anwendungen. [2]

Eine solche Datei kann eine sinnvolle Orientierung bieten. Insbesondere umfangreiche technische Dokumentationen können davon profitieren, wenn relevante Inhalte zusätzlich in einer kompakten und eindeutig strukturierten Textfassung bereitgestellt werden.

Es handelt sich jedoch um einen Vorschlag und nicht um einen verpflichtenden, universell unterstützten Internetstandard.

Google erklärt in seiner Dokumentation ausdrücklich, dass spezielle KI-Dateien wie llms.txt für die generativen Funktionen der Google-Suche nicht erforderlich sind und von Google Search nicht als besonderes Optimierungsmittel verwendet werden. [3]

Die beiden Positionen widersprechen sich nicht.

Google beschreibt die Funktionsweise seines Suchsystems. Der llms.txt-Vorschlag richtet sich an ein breiteres Spektrum möglicher Agenten und Anwendungen.

Eine sinnvolle technische Ergänzung kann für einzelne Systeme hilfreich und für andere vollständig irrelevant sein.

Entscheidend ist, welche Anwendung die Ressource tatsächlich verwendet.

## 05 — Suche, Agentenzugriff und Training

Auch die Frage, ob KI-Systeme auf eine Website zugreifen dürfen, lässt sich nicht pauschal beantworten.

Ein automatisierter Crawler, der Informationen für einen Suchindex erfasst, verfolgt einen anderen Zweck als ein Agent, der im Auftrag eines Nutzers eine konkrete Seite aufruft.

Wiederum davon zu unterscheiden ist die Sammlung von Inhalten für das Training eines Modells.

OpenAI dokumentiert diese Unterschiede beispielsweise anhand der Zugriffskomponenten OAI-SearchBot, ChatGPT-User und GPTBot. Die Einstellungen für Suchzugriff und Modelltraining lassen sich dabei getrennt behandeln. [4]

Wer seine Inhalte für KI-gestützte Recherche anbieten möchte, muss deshalb nicht zwangsläufig dieselben Entscheidungen hinsichtlich des Modelltrainings treffen.

Allerdings ist auch eine robots.txt kein Zugriffsschutz im Sinne einer Authentifizierung. Der Robots Exclusion Protocol beschreibt Regeln für kooperierende Crawler, nicht die technische Absicherung vertraulicher Ressourcen. [5]

Eine öffentlich erreichbare Textdatei bleibt öffentlich erreichbar, solange der Server den Zugriff nicht anderweitig beschränkt.

Für Unternehmen ergeben sich daraus zwei unterschiedliche Aufgaben:

Einerseits sollen öffentliche Informationen möglichst zuverlässig recherchierbar sein.

Andererseits müssen vertrauliche Informationen unabhängig von der KI-Sichtbarkeit geschützt werden.

Eine pauschale Öffnung der Infrastruktur oder Deaktivierung von Sicherheitsmaßnahmen ist deshalb keine vernünftige GEO-Strategie.

## 06 — Context Verification ist kein neues RAG

Die Informatik beschäftigt sich seit Jahren mit der Frage, wie externe Informationen in die Verarbeitung von Sprachmodellen einbezogen und deren Ergebnisse überprüft werden können.

Retrieval-Augmented Generation, kurz RAG, verbindet die Textgenerierung mit einer externen Informationsbeschaffung. Lewis et al. beschrieben 2020 eine Architektur, bei der ein trainiertes Sprachmodell mit einer abrufbaren Wissensbasis kombiniert wird. [6]

Groundedness bezeichnet in diesem Zusammenhang die Frage, inwieweit eine generierte Antwort durch den bereitgestellten Kontext gestützt wird.

Source Attribution beschäftigt sich mit der Zuordnung von Aussagen zu ihren Quellen. Der 2023 von Gao et al. vorgestellte ALCE-Benchmark untersucht unter anderem, wie gut generierte Antworten durch Quellenangaben gestützt werden. [7]

Provenance wiederum beschreibt die Herkunft von Informationen und die an ihrer Entstehung beteiligten Akteure und Prozesse. Die PROV-Spezifikationsfamilie des W3C stellt hierfür formale Grundlagen bereit. [8]

Alle vier Konzepte berühren die hier beschriebene Problemstellung.

Sie beantworten jedoch nicht automatisch die organisatorische Frage, ob die Informationsgrundlage den Anforderungen eines konkreten Arbeitsauftrags entspricht.

Eine Antwort kann vollständig durch ein Dokument gestützt sein und dennoch auf der falschen Version dieses Dokuments beruhen.

Ein technischer Assistent kann beispielsweise eine korrekte Implementierung entsprechend einer veralteten Schnittstellendokumentation erzeugen. Die Antwort ist dann möglicherweise in sich schlüssig, für den tatsächlichen Arbeitsauftrag jedoch ungeeignet.

Context Verification ergänzt diese Perspektiven um die Prüfung der vorgesehenen Informationsgrundlage.

Unter **Context Verified Development** verstehe ich einen praktischen Arbeitsansatz, bei dem sowohl das erzeugte Ergebnis als auch der dafür maßgebliche Kontext einer nachvollziehbaren Prüfung unterzogen werden.

Der Begriff bezeichnet hier keinen etablierten wissenschaftlichen Standard. Er beschreibt eine Anforderung an verantwortbare KI-gestützte Arbeitsprozesse.

## 07 — Ein reproduzierbares Prüfverfahren

Die fiktive Fallstudie lässt sich in ein reales Prüfverfahren überführen.

Dafür benötigt ein Unternehmen zunächst eine eindeutig identifizierbare Referenzfassung des zu untersuchenden Dokuments.

Diese Fassung sollte während der Vergleichsversuche unverändert bleiben.

Anschließend werden unterschiedliche Zugriffswege getrennt untersucht.

| Test | Zugriffsweg | Untersuchungsziel |
| --- | --- | --- |
| T01 | Direktes HTML | Verarbeitung der veröffentlichten Webseite |
| T02 | TXT | Verarbeitung des vollständigen Textes |
| T03 | Markdown | Verarbeitung strukturierter Textinhalte |
| T04 | Alternative Hosting-Adresse | Eingrenzung infrastruktureller Ursachen |
| T05 | Datei-Upload | Vergleich ohne externen Web-Abruf |
| T06 | Recherche ohne direkte URL | Auffindbarkeit über Suchsysteme |

Für jeden Versuch werden Produkt, bekannte Modellversion, Zeitpunkt, Zugriffsmodus, angefragte Ressource, Dokumentversion und Antwort erfasst.

Die Untersuchungen erfolgen möglichst in neuen Gesprächen. Die Reihenfolge wird variiert, Vorwissen aus anderen Versuchen wird nicht bewusst übertragen.

Mehrfache Wiederholungen helfen dabei, zufällige Unterschiede von wiederkehrenden Problemen zu unterscheiden.

Wo die verwendete Anwendung keine Informationen über ihre Abrufwege bereitstellt, bleibt diese Einschränkung Bestandteil des Ergebnisses.

Fehlende Messwerte dürfen nicht durch Vermutungen ersetzt werden.

### Der Prüfauftrag

Ein standardisierter Prompt kann beispielsweise folgendermaßen aufgebaut sein:

> Rufe das angegebene Dokument ab. Prüfe zunächst, ob dir die für den Auftrag erforderlichen Inhalte tatsächlich zur Verfügung stehen.
>
> Nenne die Dokumentversion, den verwendeten Zugriffsweg und konkrete Fundstellen für die nachfolgenden Kontrollfragen.
>
> Unterscheide zwischen direkt abgerufenen Inhalten, bereits vorhandenem Kontext und nicht überprüfbaren Informationen.
>
> Falls dir relevante Teile fehlen, teile dies ausdrücklich mit. Rekonstruiere die fehlenden Inhalte nicht anhand allgemeiner Kenntnisse.
>
> Beginne erst anschließend mit der fachlichen Bewertung.

Die konkreten Kontrollfragen werden vom Prüfenden vorab definiert. Sie sollten sich auf mehrere Teile des Dokuments beziehen und nicht bereits durch die Formulierung des Prompts beantwortet werden.

Der Prüfauftrag ist dabei keine technische Sicherheitsfunktion. Ein Sprachmodell kann auch auf einen sorgfältig formulierten Prompt fehlerhaft reagieren.

Er ist lediglich eine zusätzliche Maßnahme zur Verbesserung der Nachvollziehbarkeit.

## 08 — Was ein Prüfwert beweist. Und was nicht.

Eine Möglichkeit zur eindeutigen Identifikation einer Dokumentfassung ist die Berechnung eines kryptografischen Hashwerts, beispielsweise mit SHA-256.

Ein solcher Prüfwert ermöglicht den Vergleich konkreter Dateiinhalte. Schon kleine Änderungen an der Datei führen mit sehr hoher Wahrscheinlichkeit zu einem anderen Ergebnis.

Ein KI-System, das einen korrekten Prüfwert nennt, hat damit jedoch nicht automatisch das gesamte Dokument gelesen.

Es könnte den Wert aus einem Inhaltsverzeichnis, einem Suchindex oder einem anderen verfügbaren Kontext übernommen haben.

Ähnliches gilt für Versionsnummern.

Eine korrekte Versionsangabe ist hilfreich, aber kein vollständiger Herkunftsnachweis.

Für anspruchsvollere Untersuchungen können zusätzlich zufällige Prüfkennungen in eigens dafür angelegten Testdokumenten verwendet werden. Eine korrekte Wiedergabe solcher Kennungen ist ein Indiz dafür, dass die betreffenden Textstellen verfügbar waren.

Ob diese Informationen direkt von der Website, aus einem Zwischenspeicher oder über einen anderen Abrufweg stammen, bleibt ohne zusätzliche technische Evidenz offen.

Deshalb sollten verschiedene Nachweise kombiniert werden.

| Nachweis | Was er belegen kann |
| --- | --- |
| Serverprotokoll | Eine Anfrage wurde vom Server erfasst |
| HTTP-Header | Eigenschaften einer konkreten Antwort |
| Inhaltsprüfwert | Übereinstimmung einer konkreten Bytefolge |
| Dokumentversion | Identifikation einer bezeichneten Fassung |
| Korrekte Textstelle | Kenntnis eines bestimmten Inhalts |
| Quellenzuordnung | Nachvollziehbarer Bezug einer Aussage |
| Extraktionsprotokoll | Welche Teile des Dokuments verarbeitet wurden |

Keiner dieser Nachweise allein beantwortet sämtliche Fragen.

Insbesondere dürfen ein Serverzugriff und die tatsächliche Verwendung des abgerufenen Inhalts im Sprachmodell nicht miteinander gleichgesetzt werden.

## 09 — Verantwortung auf beiden Seiten

Website-Betreiber können die Voraussetzungen für einen zuverlässigen Informationszugriff verbessern.

Dazu gehören stabile Adressen, nachvollziehbare Dokumentstrukturen, geeignete Ausgabeformate, korrekte HTTP-Antworten und eine konsistente Versionierung.

Für die professionelle Nutzung von KI-Anwendungen wäre es darüber hinaus hilfreich, wenn Anbieter technische Herkunftsnachweise in standardisierter Form bereitstellen würden.

Eine solche Abrufdokumentation könnte beispielsweise enthalten:

- Tatsächlich angefragte und nach Weiterleitungen erreichte URL
- Zeitpunkt und Ergebnis des Abrufs
- Herkunft aus Live-Quelle, Suchindex, Cache oder Nutzerdokument
- Dokumentversion oder Inhaltsprüfwert
- Umfang und Grenzen der Inhaltsextraktion
- Zuordnung verwendeter Textabschnitte zu einzelnen Aussagen

Diese Informationen sollten möglichst aus den beteiligten technischen Komponenten stammen und nicht ausschließlich vom Sprachmodell formuliert werden.

Dabei sind Datenschutz und Vertraulichkeit ebenso zu berücksichtigen wie der Schutz der beteiligten Infrastruktur.

Auch ein technisch nachvollziehbarer Abruf ersetzt keine fachliche Prüfung des Ergebnisses.

Er ermöglicht aber eine begründete Entscheidung darüber, ob die Informationsgrundlage für eine solche Prüfung ausreicht.

## 10 — Keine Antwort kann eine gute Antwort sein

Die Qualität einer KI-Anwendung wird häufig anhand der von ihr erzeugten Antworten beurteilt.

Dabei verdient auch die Fähigkeit, unter bestimmten Umständen auf eine Antwort zu verzichten, Beachtung.

Wenn eine Anwendung ein Dokument nicht abrufen kann, sollte sie diesen Umstand offenlegen.

Das gilt ganz besonders für Aufgaben, bei denen eine fachliche Bewertung ausdrücklich von einem bestimmten Dokument abhängt.

Ein transparenter Hinweis auf fehlenden Zugriff löst zwar nicht das ursprüngliche Problem.

Er verhindert jedoch, dass eine nicht vorhandene Informationsgrundlage mit einer tatsächlich erfolgten Prüfung verwechselt wird.

Die Auswertung eines KI-gestützten Arbeitsprozesses sollte deshalb mindestens folgende Eigenschaften getrennt betrachten:

| Qualitätsmerkmal | Prüffrage |
| --- | --- |
| Inhaltszugriff | Liegen relevante Dokumentinhalte vor? |
| Versionsrichtigkeit | Entsprechen sie der vorgesehenen Fassung? |
| Kontextabdeckung | Wurden die erforderlichen Abschnitte berücksichtigt? |
| Quellenrichtigkeit | Sind Zitate und Fundstellen überprüfbar? |
| Fachliche Qualität | Ist die daraus abgeleitete Bewertung korrekt? |
| Transparenz | Werden fehlende Informationen offengelegt? |

Eine einzige Gesamtnote würde wichtige Unterschiede zwischen diesen Eigenschaften verdecken.

Ein fehlgeschlagener Abruf ist ein technisches Problem. Eine unbelegte fachliche Bewertung kann darüber hinaus zu einem organisatorischen Problem werden.

## Fazit

Die Diskussion über SEO und GEO konzentriert sich überwiegend auf die Sichtbarkeit digitaler Inhalte.

Für Unternehmen, die künstliche Intelligenz in operative und fachliche Arbeitsprozesse integrieren, reicht diese Perspektive nicht aus.

Die Auffindbarkeit eines Dokuments ist nicht mit seiner Verfügbarkeit im Modellkontext gleichzusetzen. Und seine Verfügbarkeit ist noch kein Nachweis einer angemessenen Verarbeitung.

Diese Unterschiede betreffen nicht nur Websites. Sie betreffen Wissensdatenbanken, Quellcode, Produktspezifikationen, Verträge und interne Dokumentationen.

Die Frage, ob eine KI eine überzeugende Antwort erzeugen kann, wird dadurch um eine weitere ergänzt:

Auf welcher überprüfbaren Grundlage ist diese Antwort entstanden?

**KI-Lesbarkeit ist eine Eigenschaft der Ressource. Kontextverifizierung ist eine Eigenschaft des Arbeitsprozesses.**

## Quellen und weiterführende Informationen

[1] Aggarwal et al. (2024): GEO: Generative Engine Optimization. Proceedings of the 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining. [Publikation im Preprint-Format](https://arxiv.org/abs/2311.09735)

[2] Howard, Jeremy (2024/2026): The /llms.txt file, v2. Vorschlag einer Konvention für die Bereitstellung agentenfreundlicher Webinformationen. Aktualisiert am 10. August 2026. [llmstxt.org](https://llmstxt.org/)

[3] Google Search Central: Optimizing your website for generative AI features on Google Search. Offizielle Hinweise zu SEO, generativen Suchfunktionen und speziellen KI-Dateien. [Dokumentation](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

[4] OpenAI: Overview of OpenAI Crawlers. Beschreibung der unterschiedlichen Zugriffskomponenten für Suche, nutzerinitiierte Aktionen und Modelltraining. [Dokumentation](https://developers.openai.com/api/docs/bots)

[5] IETF (2022): RFC 9309: Robots Exclusion Protocol. [Internetstandard](https://www.rfc-editor.org/rfc/rfc9309.html)

[6] Lewis et al. (2020): Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. [Wissenschaftliche Publikation](https://arxiv.org/abs/2005.11401)

[7] Gao et al. (2023): Enabling Large Language Models to Generate Text with Citations. Proceedings of EMNLP 2023. [ACL Anthology](https://aclanthology.org/2023.emnlp-main.398/)

[8] W3C (2013): PROV-Overview: An Overview of the PROV Family of Documents. [W3C-Spezifikation](https://www.w3.org/TR/prov-overview/)

[9] IETF (2022): RFC 9110: HTTP Semantics, § 15.3.1. [Internetstandard](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.1)

### Aus der Romanwelt

- [Ein ganz normaler Donnerstag – Folgenreich](/roman/ein-ganz-normaler-donnerstag/)
- [Das fiktive Intranet der Agentur](/intranet/)
- [365 Tage E-Commerce – Jahresplanung und operative Betriebsorganisation](/intranet/365-tage-e-commerce/)
- [Versionierte Markdown-Referenz, Version 0.2.0](https://github.com/blame76/f0lg3nr31ch-Nine-to-Five-And-Beyond/blob/9c870a0e8bfff87e0eff81f447a88b75b4aadeef/public/intranet/365-tage-e-commerce/jahresplaner.md)

*Redaktioneller Hinweis: Dieser Beitrag verbindet reale Fachrecherche mit einer ausdrücklich fiktiven Fallstudie aus dem Romanexperiment Folgenreich – Nine to Five. And Beyond. Die Fallstudie ist keine empirische Anbieteruntersuchung. Das beschriebene Prüfverfahren ist ein methodischer Vorschlag.*

*Recherche-Stand: 19. November 2026. Der Beitrag entstand unter Mitwirkung generativer KI.*
